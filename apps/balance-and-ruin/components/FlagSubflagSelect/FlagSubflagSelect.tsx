import React, { useId, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseSelect from "react-select";
import { FlagLabel } from "~/components/FlagLabel/FlagLabel";
import { FlagSelectOption } from "~/components/FlagSelectOption/FlagSelectOption";
import {
  EMPTY_FLAG_VALUE,
  selectActiveMutuallyExclusiveFlag,
  setFlag,
  useFlagValueSelector,
} from "~/state/flagSlice";
import { FlagValue, selectDescription } from "~/state/schemaSlice";
import { renderDescription } from "~/utils/renderDescription";

export type SubflagOption = {
  defaultValue: FlagValue;
  flag: string;
  helperText: string;
  label: string;
  // if true, it will match flag name + defaultValue to the current selected.
  isStatic?: boolean;
  Renderable?: React.FC<{ children: React.ReactNode }> | null;
};

export type FlagSubflagSelectProps = {
  label: string;
  options: SubflagOption[];
  nullable?: {
    description: string;
    label: string;
  };
  defaultSelected?: SubflagOption;
};

export const FlagSubflagSelect = ({
  label,
  nullable,
  options: baseOptions,
  defaultSelected,
}: FlagSubflagSelectProps) => {
  const dispatch = useDispatch();
  const id = useId();

  const selectedFlag = useSelector(
    selectActiveMutuallyExclusiveFlag(...baseOptions.map(({ flag }) => flag))
  );

  const schemaDescription = useSelector(
    selectedFlag ? selectDescription(selectedFlag) : () => null
  );

  const empty = useMemo<SubflagOption>(
    () => ({
      flag: EMPTY_FLAG_VALUE,
      label: nullable?.label ?? "",
      defaultValue: null,
      helperText: nullable?.description ?? "",
    }),
    [nullable]
  );

  const options: SubflagOption[] = useMemo(() => {
    const newOptions = [...baseOptions];
    if (nullable) {
      newOptions.unshift(empty);
    }

    return newOptions;
  }, [baseOptions, empty, nullable]);

  const onChange = ({ defaultValue, flag }: SubflagOption) => {
    if (selectedFlag && selectedFlag !== EMPTY_FLAG_VALUE) {
      dispatch(
        setFlag({
          flag: selectedFlag,
          value: null,
        })
      );
    }

    if (flag !== EMPTY_FLAG_VALUE) {
      dispatch(
        setFlag({
          flag,
          value: defaultValue,
        })
      );
    }
  };
  const selectedValue = useFlagValueSelector<FlagValue>(selectedFlag!);

  const selectedOption = useMemo(
    () =>
      options.find(({ defaultValue, flag, isStatic }) => {
        if (flag === selectedFlag) {
          if (isStatic) {
            return flag === selectedFlag && defaultValue === selectedValue;
          }
        }
        return flag === selectedFlag;
      }) ??
      defaultSelected ??
      empty,
    [options, defaultSelected, empty, selectedFlag, selectedValue]
  );

  const description = renderDescription(
    selectedOption.helperText ?? schemaDescription ?? "",
    selectedValue
  );

  const { Renderable } = selectedOption;

  const Select = (
    <BaseSelect
      className="ff6wc-select-container"
      classNamePrefix="ff6wc-select"
      components={{ Option: FlagSelectOption }}
      instanceId={id}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.flag + option.defaultValue}
      options={options}
      onChange={(selected) => onChange(selected as SubflagOption)}
      value={selectedOption}
    />
  );

  return (
    <div className="flex flex-col gap-1">
      <>
        <FlagLabel
          flag={selectedOption.flag}
          helperText={description}
          label={label}
        />

        {Renderable ? <Renderable>{Select}</Renderable> : Select}
      </>
    </div>
  );
};

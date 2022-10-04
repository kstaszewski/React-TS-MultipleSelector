import React, { useEffect } from 'react';
import css from './Select.module.css';
import { useState } from 'react';

export type SelectOption = {
    label: string,
    value: string | number,
};

type MultipleSelectProps = {
    multiple: true;
    value: SelectOption[],
    onChange: (value: SelectOption[]) => void,
};

type SingleSelectProps = {
    multiple?: false;
    value?: SelectOption,
    onChange: (value?: SelectOption) => void,
};

type SelectProps = {
    options: SelectOption[],
} & (SingleSelectProps | MultipleSelectProps);

export default function Select({ multiple, value, onChange, options }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const clearOptions = () => {
        multiple ? onChange([]) : onChange(undefined);
    };

    const selectOption = (option: SelectOption) => {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter(o => o !== option));
            } else {
                onChange([...value, option]);
            }
        } else {
            if (option !== value) onChange(option);
        }
    };

    const isOptionSelected = (option: SelectOption) => {
        return multiple ? value.includes(option) : option === value;
    };

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0);
    }, [isOpen]);

    return (
        <>
            <div
                tabIndex={0}
                className={css.container}
                onBlur={() => setIsOpen(false)}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={css.value}>{multiple ? value.map(v => (
                    <button
                        key={v.value}
                        className={css.optionBadge}
                        onClick={e => {
                            e.stopPropagation();
                            selectOption(v);
                        }}>
                        {v.label}
                        <span className={css.removeBtn}>&times;</span>
                    </button>
                )) : value?.label}</span>
                <button
                    className={css.clearBtn}
                    onClick={e => {
                        e.stopPropagation();
                        clearOptions();
                    }}
                >&times;</button>
                <div className={css.divider}></div>
                <div className={css.caret}></div>
                <ul className={`${css.options} ${isOpen ? css.show : ""}`}>
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            className={`${css.option
                                } ${isOptionSelected(option) ? css.selected : ''
                                } ${index === highlightedIndex ? css.highlighted : ''
                                } `}
                            onClick={e => {
                                e.stopPropagation();
                                selectOption(option);
                                setIsOpen(false);
                            }}
                            onMouseEnter={() => setHighlightedIndex(index)}
                        >{option.label}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}
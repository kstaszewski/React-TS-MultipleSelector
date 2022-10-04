import React, { useEffect } from 'react';
import css from './Select.module.css';
import { useState } from 'react';

type SelectOption = {
    label: string,
    value: string | number,
};

type SelectProps = {
    options: SelectOption[],
    value?: SelectOption,
    onChange: (value?: SelectOption) => void,
};

export default function Select({ value, onChange, options }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const clearOptions = () => {
        onChange(undefined);
    };

    const selectOption = (option: SelectOption) => {
        if (option !== value) onChange(option);
    };

    const isOptionSelected = (option: SelectOption) => {
        return option === value;
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
                <span className={css.value}>{value?.label}</span>
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
import React from 'react';


export const Select = ({name, label, value, onChange , error = "",children}) => (

    <div className="form-group">
        <label htmlFor={name}>{label}
            <select className={"form-control " + (error && "is-invalid")} id={name}
                   name={name}
                    value={value} onChange={onChange}>
                {children}
            </select>
        </label>
        {error && <div className="invalid-feedback d-block">
            {error}
        </div>
        }

    </div>

);
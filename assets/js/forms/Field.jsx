import React from 'react';


export const Field = ({name, label, value, onChange, placeholder, type = "text", error = ""}) => (

    <div className="form-group">
        <label htmlFor={name}>{label}
            <input className={"form-control " + (error && "is-invalid")} type={type} id={name}
                   name={name}
                   placeholder={placeholder}
                   value={value} onChange={onChange}/>
        </label>
        {error && <div className="invalid-feedback d-block">
            {error}
        </div>
        }

    </div>

);
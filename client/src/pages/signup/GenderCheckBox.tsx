type Gender = 'male' | 'female' | ''

type GenderCheckBoxPropTypes = {
    gender: Gender
    setGender: React.Dispatch<React.SetStateAction<Gender>>
}

const GenderCheckBox = ({ gender, setGender }: GenderCheckBoxPropTypes) => {
    return (
        <div className='flex'>
            <div className='form-control'>
                <label
                    htmlFor='maleCheckbox'
                    className={`label cursor-pointer gap-2 ${gender === 'male' ? 'selected' : ''}`}>
                    <span className='label-text'>Male</span>
                    <input
                        type='checkbox'
                        id='maleCheckbox'
                        checked={gender === 'male'}
                        onChange={() => setGender('male')}
                        className='checkbox checkbox-primary border-slate-900'
                    />
                </label>
            </div>
            <div className='form-control'>
                <label
                    htmlFor='femaleCheckbox'
                    className={`label cursor-pointer gap-2 ${gender === 'female' ? 'selected' : ''}`}>
                    <span className='label-text'>Female</span>
                    <input
                        type='checkbox'
                        id='femaleCheckbox'
                        checked={gender === 'female'}
                        onChange={() => setGender('female')}
                        className='checkbox checkbox-secondary border-slate-900'
                    />
                </label>
            </div>
        </div>
    )
}
export default GenderCheckBox

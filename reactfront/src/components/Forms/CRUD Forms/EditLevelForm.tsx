import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const EditLevelForm = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [requiredXP, setRequiredXP] = useState('');
    const [errors, setErrors] = useState(['']);
    const navigate = useNavigate();

    useEffect(() => {
      axios
      .get(`http://localhost:5095/Level/id?id=${id}`)
      .then(res => {
        setName(res.data.name),
        setRequiredXP(res.data.requiredXP)
    })
      .catch(e => setErrors([e.response.data]));
    }, []);

    useEffect(() => {
        if(errors.length == 0) {
            axios.put(`http://localhost:5095/Level/id?id=${id}`, {
                'name': name,
                'requiredXP': requiredXP
            })
            .then(res => navigate('/levels'))
            .catch(err => setErrors([err.response.data]));
        }
  
    }, [errors]);
    
    const handleEdit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const missingFields = [];
    
        if (name === '') {
        missingFields.push('Name field is missing');
        }

        if (requiredXP === '') {
        missingFields.push('Required XP field is missing');
        }

        setErrors(missingFields);
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
                Perditeso Level
            </h3>
        </div>

        <form onSubmit={handleEdit}>
            <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                    <label className="mb-3 block text-black dark:text-white">
                        Emri
                    </label>
                    <input
                        type="text"
                        placeholder="Shkruaj ketu..."
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-meta-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                
                <div>
                    <label className="mb-3 block text-black dark:text-white">
                        RequiredXP
                    </label>
                    <input
                        type="text"
                        placeholder="Shkruaj ketu..."
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-meta-3"
                        value={requiredXP}
                        onChange={(e) => setRequiredXP(e.target.value)}
                    />
                </div>
            </div>
            
            {errors.map(e => <p className='text-red-500 block text-center'>{e}</p>)}
            <div className="flex flex-col gap-5.5 p-6.5">
                <button 
                    className="inline-flex items-center justify-center bg-meta-3 py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                        Perditeso
                </button>
            </div>
        </form>

    </div>
  )
}

export default EditLevelForm
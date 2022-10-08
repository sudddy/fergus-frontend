import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "request/index"
import CloseIcon from "images/close.svg"

const UpdateJob = ({job,setShowModal }) => {

  const [showLoader, setShowLoader] = useState(false);

  useEffect(()=> {
      setValue('job.job_name', job.job_name);
      setValue('job.contact_details', job.contact_details);
      setValue('job.status', job.status);
  },[job])

  const onSubmit = (data) => {
      setShowLoader(true);
      data.job._id = job._id;
      axios.put(`/jobs/`, data.job).then((req) => {
          console.log(req.data);        
      })
      setShowLoader(false);
      setShowModal(false);
  };

  const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
  } = useForm();

    
return (
    <Fragment>  
    <div className="flex flex-col p-6 w-96  rounded items-center">
      <div className="flex flex-row  w-full justify-between">
      <h2 className="text-lg ml-2"><span className="text-blue-500 uppercase">{job.job_name}</span></h2>
      <img src={CloseIcon}   onClick={() => setShowModal(false)}/>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-6 mt-10">
          {/**
           * contact details
           */}
          <input
            type="number"
            className="form-control block w-80 h-14 px-3 py-1.5 border border-solid border-formBorder rounded"
            id="exampleInputPassword1"
            placeholder="Email"
            {...register("job.contact_details", {
              required: true,
            })}
          />
        {errors.email && errors.email.type === "required" && <span className="mt-10 text-primary">Contact details is required</span>}
        </div>

        <div className="form-group mb-6">
          {/**
           * Job status
           */}
           <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
           {...register("job.status", {
              required: true,
            })}>
                  <option value="scheduled">Scheduled</option>
                  <option value="active">Active</option>
                  <option value="invoicing">Invoicing</option>
                  <option value="to priced">To priced</option>
                  <option value="completed">Completed</option>
          </select>
        {errors.phone_number && errors.phone_number.type === "required" && <span className="mt-10 text-primary">Job status is required</span>}
        </div>
        <button
          type="submit"
          className="inline-flex justify-center px-6 py-2.5  w-80 rounded-md border-2 text-white bg-sky-800 hover:text-sky-800 hover:bg-white"
        >
          Update
        </button>
      </form>
    </div>
  </Fragment>
)

};


export default UpdateJob;
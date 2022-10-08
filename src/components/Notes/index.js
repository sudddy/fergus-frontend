import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "request/index";
import DeleteIcon from "images/delete.svg";
import CloseIcon from "images/close.svg"

const Notes = ({ job, setJob, setShowModal }) => {

    const [showLoader, setShowLoader] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        setShowLoader(true);
        data._id = job._id;
        data.notes = [...job.notes, data.notes];
        axios.put(`/jobs/`, data).then((req) => {
            setJob(req.data);
        })
        setShowLoader(false);
    };

    const deleteNotes = (item) => {
        let data = {}
        data.notes = job.notes.filter((i) => i != item)
        data._id = job._id;
        axios.put(`/jobs/`, data).then((req) => {
            setJob(req.data);
        })
    }

    return (
        <Fragment>
            <div className="flex flex-col p-6 w-[600px] rounded items-center overflow-auto">
                <div className="flex flex-row  w-full justify-between">
                    <h2 className="text-blue-500 uppercase">Add Notes</h2>
                    <img src={CloseIcon} onClick={() => setShowModal(false)} />
                </div>
                <div className="flex flex-row  w-full mt-4">
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                        <textarea
                            id="message"
                            rows="6"
                            className="w-full h-20 px-3 py-1.5 border border-solid border-formBorder rounded"
                            placeholder="Comment"
                            {...register("notes", {
                                required: false,
                            })}
                        ></textarea>

                        <button
                            type="submit"
                            className="inline-flex justify-center px-6 py-2.5 w-full rounded-md border-2 text-white bg-sky-800 hover:text-sky-800 hover:bg-white"
                        >

                            {showLoader ? "Adding Notes.." : "Add Notes"}
                        </button>
                    </form>
                </div>

                {job.notes == 0 ? <div class="flex justify-between w-full p-2 mt-4 bg-white rounded-md border shadow-md">
                    <div className="w-40">  <p class="mb-2 text-gray-900 dark:text-black">No Notes to display</p> </div>
                </div> :

                    <div className="w-full h-80 overflow-y-auto">
                        {job.notes && job.notes.map((item) => (
                            <div class="flex justify-between w-full p-2 mt-4 mr-10 bg-white rounded-md border shadow-md overflow-auto">
                                <div className="w-40">  <p class="mb-2 text-gray-900 dark:text-black">{item}</p> </div>
                                <img src={DeleteIcon} onClick={() => deleteNotes(item)} />
                            </div>
                        ))}
                    </div>
                }

            </div>
        </Fragment>
    )
};

export default Notes;
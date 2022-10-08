import UpdateJob from "components/UpdateJob";
import Notes from "components/Notes"
import { Fragment } from "react";




export default function Modal({ job, setJob, setShowModal,notes }) {

    return (
        <Fragment>
        <div className="justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
  
            <div className="flex flex-row rounded-2xl shadow-lg relative w-full bg-white ">
              {/*body*/}

           { notes ? <Notes job={job} setJob={setJob} setShowModal={setShowModal} />
            :<UpdateJob setJob={setJob} job={job} setShowModal={setShowModal} /> }
            
            </div>
          </div>
        </div>
        <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
      </Fragment>
    );
}

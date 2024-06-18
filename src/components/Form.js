import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReactMic } from 'react-mic';
import { FaMicrophoneAlt } from "react-icons/fa";
import { IoMdMicOff } from "react-icons/io";


const Form = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [startRecording, setStartRecording] = useState(false);
    const [recordingURL, setRecordingURL] = useState("");
    const [formDataSubmitted, setFormDataSubmitted] = useState(null);

    const startRecordingHandler = () => {
        setStartRecording(!startRecording);
        
        setTimeout(() => {
            setStartRecording(false);
        }, 10000);
    };

    const handleAudio = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);
        setRecordingURL(recordedBlob.blobURL);
    };

    const onSubmit = (data) => {
        if(recordingURL === ""){
            alert("Please record an audio file before submitting the form");
            return;
        }
        const formData = new FormData();
        formData.append("Name", data.Name);
        formData.append("Email", data.Email);
        formData.append("AudioURL", recordingURL);
        setRecordingURL("");

        // Store form data and recording URL in localStorage
        reset({
            Name: "",
            Email: "",
        });
        localStorage.setItem("Name", data.Name);
        localStorage.setItem("Email", data.Email);
        localStorage.setItem("AudioURL", recordingURL);

        setFormDataSubmitted(formData); // Save form data for display

        // We can also use formDataSubmitted for API calls
    };

    return (
        <div>
            <div className='flex justify-center items-center w-[50%] mt-20 mx-auto rounded-lg bg-slate-400'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full p-10 flex flex-col gap-3'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='Name'> Name <sup className="text-pink-900">*</sup></label>
                        <input
                        className='pl-2 rounded-md'
                            type="text"
                            id="Name"
                            name="Name"
                            placeholder='Enter your Name'
                            {...register("Name", { required: true })}
                        />
                        {errors.Name && <span className="text-pink-900"> This field is required</span>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='Email'> Email <sup className="text-pink-900">*</sup></label>
                        <input className='pl-2 rounded-md'
                            type="email"
                            id="Email"
                            name="Email"
                            placeholder='Enter your Email id'
                            {...register("Email", { required: true })}
                        />
                        {errors.Email && <span className="text-pink-900"> This field is required</span>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label>Record Audio (Up to 10 seconds) <sup className="text-pink-900">*</sup></label>
                        
                        <button type="button" onClick={startRecordingHandler}
                        className=' flex gap-2 items-center'>
                                 {startRecording ? (
                                    <div className='flex gap-2 items-center'>
                                        <div>Stop Recording</div> 
                                        <IoMdMicOff />
                                    </div>
                                 ) : (
                                    <div className='flex gap-2 items-center'>
                                        <div>Start Recording</div> 
                                        <FaMicrophoneAlt />
                                    </div>
                                 )}
                        </button>
                        <div className="flex ">
                            <ReactMic
                                className='w-[100%]'
                                record={startRecording}
                                onStop={handleAudio}
                                visualSetting="sinewave"
                                mimeType="audio/wav"
                            />
                            
                        </div>
                        {recordingURL &&
                         <div>
                         <h2>Recorded Audio</h2>
                         <audio src={recordingURL} controls="controls" />
                       </div>
                        }
                    </div>
                    <button type="submit" className='bg-slate-700 text-slate-400 p-2 rounded-md'>
                        Submit Details
                    </button>
                </form>
            </div>

            {/* Display saved form data */}
            {formDataSubmitted && (
                <div className="mt-5 p-5 border border-gray-300 rounded-lg bg-gray-100">
                    <h2>Form Data Submitted:</h2>
                    <p><strong>Name:</strong> {formDataSubmitted.get("Name")}</p>
                    <p><strong>Email:</strong> {formDataSubmitted.get("Email")}</p>
                    <p><strong>Audio URL:</strong> {formDataSubmitted.get("AudioURL")}</p>
                </div>
            )}
        </div>
    );
};

export default Form;

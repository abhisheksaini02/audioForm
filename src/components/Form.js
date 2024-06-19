import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReactMic } from 'react-mic';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { IoMdMicOff } from 'react-icons/io';

const Form = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [startRecording, setStartRecording] = useState(false);
    const [recordingURL, setRecordingURL] = useState("");
    const [formDataSubmitted, setFormDataSubmitted] = useState(null);

    // Function to start recording and handle AudioContext initialization
    const startRecordingHandler = () => {
        const handleAudioContext = () => {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();

            // Proceed with recording setup
            setStartRecording(true);
            setTimeout(() => {
                setStartRecording(false);
            }, 10000); // Stop recording after 10 seconds
        };

        // Check if AudioContext is suspended and resume it on user gesture
        if (suspendedAudioContext()) {
            resumeAudioContext().then(handleAudioContext);
        } else {
            handleAudioContext();
        }
    };

    // Check if AudioContext is suspended
    const suspendedAudioContext = () => {
        return (suspendedAudioContext.audioContext.state === 'suspended');
    };

    // Resume AudioContext
    const resumeAudioContext = () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        return audioContext.resume();
    };

    // Handle recorded audio blob
    const handleAudio = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);
        setRecordingURL(recordedBlob.blobURL);
    };

    // Form submission handler
    const onSubmit = (data) => {
        if (recordingURL === "") {
            alert("Please record an audio file before submitting the form");
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append("Name", data.Name);
        formData.append("Email", data.Email);
        formData.append("AudioURL", recordingURL);

        // Reset form fields and local storage
        reset({
            Name: "",
            Email: "",
        });
        localStorage.setItem("Name", data.Name);
        localStorage.setItem("Email", data.Email);
        localStorage.setItem("AudioURL", recordingURL);

        // Store form data for display
        setFormDataSubmitted(formData);
    };

    return (
        <div>
            <div className='flex justify-center items-center w-[50%] mt-20 mx-auto rounded-lg bg-slate-400'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full p-10 flex flex-col gap-3'>
                    {/* Input fields for Name and Email */}
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
                        <input
                            className='pl-2 rounded-md'
                            type="email"
                            id="Email"
                            name="Email"
                            placeholder='Enter your Email id'
                            {...register("Email", { required: true })}
                        />
                        {errors.Email && <span className="text-pink-900"> This field is required</span>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        {/* Start/Stop recording button */}
                        <label>Record Audio (Up to 10 seconds) <sup className="text-pink-900">*</sup></label>
                        <button type="button" onClick={startRecordingHandler} className='flex gap-2 items-center'>
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

                        {/* ReactMic component for recording */}
                        <div className="flex">
                            <ReactMic
                                className='w-[100%]'
                                record={startRecording}
                                onStop={handleAudio}
                                mimeType="audio/wav"
                            />
                        </div>

                        {/* Display recorded audio */}
                        {recordingURL && (
                            <div>
                                <h2>Recorded Audio</h2>
                                <audio src={recordingURL} controls />
                            </div>
                        )}
                    </div>

                    {/* Submit button for the form */}
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

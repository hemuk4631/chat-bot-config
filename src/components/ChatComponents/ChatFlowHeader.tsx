import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function ChatFlowHeader({
  onSave,
  onTest,
  onDeploy,
  workFlowName,
  setWorkFlowName
}) {
  const [savedMessage, setSavedMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    setValue('workflowName', workFlowName);
  }, [workFlowName]);
  // Convert workflow name to camelCase
  const camelCaseTransform = (value) => {
    if (!value) return;
    const words = value.split(' ');
    for (let i = 1; i < words.length; i++) {
      words[0] =
        words[0].charAt(0).toLowerCase() +
        words[0].slice(1) +
        words[i].charAt(0).toUpperCase() +
        words[i].slice(1);
    }
    setWorkFlowName(words[0]);
    return words[0];
  };

  // Handle form submission based on action type
  const onSubmit = (action) => () => {
    if (action === 'save') {
      setSaving(true);
      onSave();
      setTimeout(() => {
        setSavedMessage('saved!');
        setSaving(false);
      }, 1000);
      setTimeout(() => {
        setSavedMessage('');
      }, 2000);
    } else if (action === 'deploy') {
      onDeploy();
    }
  };

  return (
    <div className="fixed z-100  h-14 w-full  shadow bg-white">
      <div className="flex h-full items-center justify-between px-8 text-sm">
        {/* Home & Save Buttons */}
        <div className="flex items-center gap-4">
          <button
            className="rounded-md border px-4 py-1"
            onClick={() => Router.push('/chat-config')}>
            Home
          </button>
          <form>
            <div>
              <button
                className="rounded-md border bg-blue-400 px-4 py-1 text-white"
                type="button"
                onClick={handleSubmit(onSubmit('save'))}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              <span className="ml-2 text-green-0">{savedMessage}</span>
            </div>
          </form>
        </div>

        {/* <form className="flex w-full items-center justify-between text-sm"> */}
        {/* Workflow Name Input */}
        <form className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter workflow name"
            className={`rounded-md bg-gray-100 px-2 py-1 text-center outline-none ${
              errors?.workflowName && 'border border-red-500'
            }`}
            {...register('workflowName', {
              required: 'Workflow name is required',
              onChange: (e) => {
                camelCaseTransform(e.target.value);
                setValue('workflowName', e.target.value);
                setWorkFlowName(e.target.value);
              },
            })}
          />
          {/* Error Message */}
          {errors?.workflowName && (
            <span className="mt-1 text-xs text-red-500">
              {errors?.workflowName?.message}
            </span>
          )}
        </form>

        {/* Test & Deploy Buttons */}
        <form className=" flex  gap-4">
          <button
            className="h-8 w-20 rounded-md border px-4 py-1"
            type="button"
            onClick={onTest}>
            Test
          </button>
          <button
            className="h-8 w-20 rounded-md bg-green-600 px-4 py-1 text-white"
            type="submit"
            onClick={handleSubmit(onSubmit('deploy'))}>
            Deploy
          </button>
        </form>
        {/* </form> */}
      </div>
    </div>
  );
}

export default ChatFlowHeader;

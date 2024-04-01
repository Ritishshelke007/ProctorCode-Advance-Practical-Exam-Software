import React, { useState, useContext, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector.jsx";
import { CODE_SNIPPETS } from "../constants/codeSnippets.js";
import { useSelector, useDispatch } from "react-redux";
import {
  setCode,
  setLanguage,
} from "../../../../features/code-editor/codeEditorSlice.js";
import Modal from "../../../../components/Modal/Modal.jsx";

const EditorWindow = () => {
  const [activity, setActivity] = useState("");
  const [open, setOpen] = useState(false);

  const editorRef = useRef(null);
  const dispatch = useDispatch();

  const { language, code } = useSelector((state) => state.codeEditorData);
  console.log(language, code);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const onSelectChange = (sl) => {
    const selectedLanguage = sl.value;
    dispatch(setLanguage(selectedLanguage));
    dispatch(setCode(CODE_SNIPPETS[selectedLanguage]));
    console.log(code);
  };

  // const onMount = (editor) => {
  //   editorRef.current = editor;
  //   editor.focus();
  // };

  const options = {
    selectOnLineNumbers: true,
    mouseWheelZoom: true,
    fontSize: 18,
    contextmenu: false,
    formatOnType: true,
    smoothScrolling: true,
    wordWrap: "on",
  };

  // useEffect(() => {
  //   console.log("useEffect running");
  //   const editor = editorRef.current;
  //   console.log("Editor reference:", editorRef.current);

  //   // Attach event listeners for copy and paste
  //   const handleCopy = () => {
  //     console.log("Copy event detected");
  //     setActivity("copy");
  //     setOpen(true);
  //   };

  //   const handlePaste = () => {
  //     console.log("paste event detected");
  //     setActivity("paste");
  //     setOpen(true);
  //   };

  //   // if (editor) {
  //   //   console.log("Attaching event listeners...");
  //   //   editor.onDidCopy(handleCopy);
  //   //   editor.onDidPaste(handlePaste);
  //   // }

  //   // return () => {
  //   //   if (editor) {
  //   //     editor.onDidCopy.dispose();
  //   //     editor.onDidPaste.dispose();
  //   //   }
  //   // };
  // }, [setOpen]);

  return (
    <>
      <div>
        <Modal activity={activity} open={open} onClose={() => setOpen(false)}>
          {/* Content of your modal */}
          <div className="text-center w-full h-52 z-50 flex justify-center items-center flex-col gap-10">
            <div className="mx-auto my-4 w-full">
              <h3 className="text-lg font-black text-gray-800">
                Tab Change Detected
              </h3>
              <p className="text-md text-gray-700 font-semibold">
                Tab change activity will be notified to faculty
              </p>
            </div>

            <button
              className="text-white bg-blueSecondary p-3 rounded-lg w-full"
              //  onClick={handleClick}
            >
              Enter Fullscreen
            </button>
          </div>
        </Modal>
        <LanguageSelector
          defLanguage={language}
          onSelectChange={onSelectChange}
        />

        <div className="overlay overflow-hidden w-full h-full shadow-4xl">
          <Editor
            height="85vh"
            width="100vw"
            theme="vs-dark"
            language={language}
            options={options}
            defaultValue={CODE_SNIPPETS[language]}
            value={code}
            onChange={(value) => dispatch(setCode(value))}
            onMount={(editor, monaco) => {
              editorRef.current = editor;
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EditorWindow;

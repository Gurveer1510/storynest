import { useState, useCallback } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; // import the CSS file
import { toast, ToastContainer } from 'react-toastify';


const TextEditor = () => {

  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [errors, setErrors] = useState<string>("")
  const navigate = useNavigate()
  const [editorState, setEditorState] = useState(EditorState.createEmpty());


  async function createBlog() {
    try {
      setIsDisabled(true)
      setErrors("")
      if(!title || !content) {
        setErrors("Title and Content are required to create a blog.")
        toast.error(errors, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return
      }
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`, {
        title: title,
        content: content
      }, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })

      if (response) {
        const id = response.data.id
        navigate(`/blog/${id}`)
      }
    } catch (error) {

    }finally {
      setIsDisabled(false)
    }
  }

  // Handle editor state change with useCallback for performance optimization
  const onEditorStateChange = useCallback((editorState: EditorState) => {
    setEditorState(editorState);
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }, []);


  return (
    <div>
      <div className="p-4 px-8 w-full flex justify-between items-center">
        <div>
          <p className="font-bold md:text-xl">Enter a Title</p>
          <input
            value={title}
            onChange={(e) => { setTitle(e.target.value); }}
            type="text"
            placeholder='Title'
            className="p-3 w-[180px] md:w-[350px] rounded-md border focus:outline-blue-600 text-sm md:text-lg md:font-semibold"
          />
        </div>
        <button onClick={createBlog} disabled={isDisabled}  className={`h-fit mt-6 px-4 md:px-6 py-2 text-lg bg-black text-white rounded-lg hover:bg-slate-800 disabled:cursor-not-allowed `}>Publish</button>
      </div>
      <div className='px-8 h-full border-b'>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
          placeholder='Type Here...'
        />
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>

  );
};

export default TextEditor;

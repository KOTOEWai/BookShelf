'use client';
import {  Key, startTransition,  useActionState,  useEffect,  useState } from 'react';
import WrongButton from '@/public/wrong-19.png'
import Image from 'next/image';
import { createBook,FormState  } from '@/actions/book';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Book = {
  imageId : string;
  bookId : string;
  index: Key | null | undefined;
  _id: string;
  BookName: string;
  Author: string;
  category: string;
  Price: string;
  BookLink: string;
  Image: string;
  Description: string;
  instock: string;
  Rating:string;
}


export default function BookList() {
 
  const [ open, setOpen] = useState(true)
  const [ uploading ,setUploading] = useState(false)
  const [book,setBook] = useState<Book[]>([])

  const showToastMessage = (id: string | undefined):void => {
      if(id){
        toast.warn('Book Deleted Successfully', {
          position: "top-right",
        });
      }else{
       toast.success("Success create Book !", {
      position: "top-right"
    });
  }
  };
  

  const BookModel = ()=>{
    setOpen(!open)
  }

  const initialState : FormState = {
    errors : {}
  }
  const [state, formAction,isPending] = useActionState(createBook, initialState);

 const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);

  const pdfFile = formData.get('BookLink') as File;
  const imageFile = formData.get('Image') as File;

  const upload = async (file: File) => {
    const uploadForm = new FormData();
    uploadForm.append('file', file);
   
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
      method: 'POST',
      body: uploadForm,
    });

    const data = await res.json();
    if (!res.ok || !data.url) {
  throw new Error("Invalid response from upload API");
}
    return data.url;
  };
 setUploading(true);
  try {
    const [bookUrl, imageUrl] = await Promise.all([
      upload(pdfFile),
      upload(imageFile),
    ]);

   const getPublicId = (url: string | undefined): string => {
  if(!url) return '';
  const parts = url.split('/');
  const folder = parts[parts.length - 2];
  const filename = parts[parts.length - 1].split('.')[0]; // remove extension
  return `${folder}/${filename}`;
};
const bookPublicId = getPublicId(bookUrl);
const imagePublicId = getPublicId(imageUrl);
    
    // Replace files with URLs
    formData.set('BookLink', bookUrl);
    formData.set('Image', imageUrl);
    formData.set('BookId', bookPublicId);      // already there
    formData.set('ImageId', imagePublicId); 

    
    // Call server action
     startTransition(() => {
      formAction(formData);
    });
     
     setTimeout(()=>{
     setOpen(true);
     fetchBook();
     },2000)
    
     showToastMessage('');


  } catch (error) {
    console.error('Upload failed', error);
    alert('File upload failed');
  }finally{
    setUploading(false)
  }
};

 async function fetchBook ()  {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchBook`);
  const data = await response.json();
  setBook(data);
 }

useEffect(()=>{
  
  fetchBook();

},[])

const handleDelete = async (_id : string, bookId: string, imageId:string) => {
         await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchBook`,{
          method: "POST",
          headers : { "Content-Type" : "application/json"},
          body: JSON.stringify({ _id , bookId,imageId})
         })
         showToastMessage(_id);
         setBook( book.filter((book)=> book._id !== _id))
}

  return (

    <div className=" ">
      <ToastContainer />
          {!open && (
        <div className="fixed inset-0 z-40 bg-white/30 backdrop-blur-sm flex items-center  justify-center overflow-y-scroll bg-opacity-30 px-4">
         <div className="relative w-full max-w-2xl mx-auto h-[90vh] p-4 sm:p-10 overflow-y-auto">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700">
              <section className="bg-white dark:bg-gray-900 rounded-lg"> 
                <div className="py-6 px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add a new book</h2>
                    <button onClick={() => setOpen(true)} className="cursor-pointer">
                      <Image src={WrongButton} alt="Close" width={30} height={30} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} action={formAction} >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Name</label>
                        <input
                          type="text"
                          name="BookName"
                          id="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Type Book name"
                          required
                        />
                         {state.errors.BookName&& (
                       <p className="text-red-500">{state.errors.BookName}</p>
                      )}
                      </div>

                      <div>
                        <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                        <input
                          type="text"
                          name="Author"
                          id="author"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Author"
                          required
                        />
                          {state.errors.Author&& (
                    <p className="text-red-500">{state.errors.Author}</p>
                      )}
                         
                      </div>
                      
                      <div>
                         <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
      <select id="category" name="category" defaultValue="ဝတ္ထု" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
       <option value="ဝတ္ထု">ဝတ္ထု</option>
    <option value="သုတ">သုတ</option>
    <option value="သမိုင်း">သမိုင်း</option>
    <option value="ဘာသာရေး">ဘာသာရေး</option>
     <option value="တိုးတက်ရေး">တိုးတက်ရေး</option>
     <option value="ပညာရေး">ပညာရေး</option>
     </select>
    {state.errors.category&& (
                    <p className="text-red-500">{state.errors.category}</p>
                      )}
                      </div>

                      <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input
                          type="number"
                          name="Price"
                          id="price"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="$29.99"
                          required
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="bookFile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book File (PDF)</label>
                        <input
                          type="file"
                          name="BookLink"
                          id="bookFile"
                          accept=".pdf"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                          {state.errors.BookLink&& (
                    <p className="text-red-500">{state.errors.BookLink}</p>
                      )}
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Image</label>
                        <input
                          type="file"
                          name="Image"
                          id="image"
                          accept="image/*"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                          {state.errors.Image&& (
                    <p className="text-red-500">{state.errors.Image}</p>
                      )}
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea
                          name="Description"
                          id="description"
                          rows={5}
                          placeholder="Enter book description"
                          className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                          {state.errors.Description&& (
                    <p className="text-red-500">{state.errors.Description}</p>
                      )}
                      </div>
                     <div>
                        <label htmlFor="instock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instock</label>
                        <input
                          type="number"
                          name="instock"
                          id="instock"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="0"
                          required
                        />
                          {state.errors.instock&& (
                    <p className="text-red-500">{state.errors.instock}</p>
                      )}
                      </div>

                    </div>

                   <button
  type="submit"
  disabled={uploading || isPending}
  className={`bg-blue-500 text-white rounded px-4 py-2 mt-4 ${uploading || isPending ? "opacity-50 cursor-not-allowed" : ""}`}
>
  {uploading || isPending ? "Submitting..." : "Submit Book"}
</button>

                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
     
      <button onClick={BookModel} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Create Book
      </button>

 <div className="w-full flex justify-between items-center mb-3 mt-5 pl-3">
    <div>
        <h3 className="text-lg font-semibold text-slate-800">BookLists</h3>
        
    </div>
    <div className="mx-3">
        <div className="w-full max-w-sm min-w-[200px] relative">
        <div className="relative">
            <input
            className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
            placeholder="Search for Book..."
            />
            <button
            className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
            type="button"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            </button>
        </div>
        </div>
    </div>
 </div>


<div className=" w-72  md:w-full h-72 overflow-y-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
  <table className="w-full text-left table-auto ">
    <thead>
      <tr className="border-b border-slate-300 bg-slate-50">
        <th className="p-4 text-sm font-normal leading-none text-slate-500">Image</th>
        <th className="p-4 text-sm font-normal leading-none text-slate-500">Name</th>
        <th className="p-4 text-sm font-normal leading-none text-slate-500">Author</th>
        <th className="p-4 text-sm font-normal leading-none text-slate-500">Category</th>
        <th className="p-4 text-sm font-normal leading-none text-slate-500">Price</th>
        <th className="p-4 text-sm font-normal leading-none text-slate-500">Rating</th>
      </tr>
    </thead>
    <tbody>

  {  book.map((Book , index)=>(
     
      <tr key={index} className="hover:bg-slate-50">
        <td className="p-2 border-b border-slate-200 ">
        
              <Image
                
                src={Book.Image}
                alt={Book.BookName}
                width={50}
                height={40}
                className="rounded shadow"
              />
           
        </td>
        <td className="p-2 border-b border-slate-200 ">
             <p className="text-sm text-slate-500">{Book.BookName}</p> 
        </td>
        <td className="p-2 border-b border-slate-200 ">
          <p className="text-sm text-slate-500">{Book.Author}</p>
        </td>
        <td className="p-2 border-b border-slate-200 ">
          <p className="text-sm text-slate-500">{Book.category}</p>
        </td>
        <td className="p-2 border-b border-slate-200 ">
          <p className="text-sm text-slate-500">{Book.Price}</p>
        </td>
          <td className="p-2 border-b border-slate-200 ">
          <p className="text-sm text-slate-500">{Book.Rating}</p>
        </td>
        <td className="p-2 border-b border-slate-200 ">
          <button type="button" onClick={()=>handleDelete(Book._id , Book.bookId , Book.imageId )} className="text-slate-500 hover:text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </td>
      </tr>
      
   ))}
    </tbody>
  </table> 
</div>


    </div>

  );
}

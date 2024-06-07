import React from "react";

function NewCategory ({ open, close }) {
    const [category, setCategory] = React.useState('');

    const createCategory = async () => {
        const res = await fetch('http://localhost:3001/category/create', {
            credentials: 'include',    
            method: 'POST',
            body: JSON.stringify({ category }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();
        console.log(data);
        if (data.error){
            alert(data.error);
        } else {
            close();
        }
    };

    if(!open) {
        return null;
    }

    return (
        <>
        <div class="flex flex-col w-2/3 md:w-1/2 lg:w-2/5 xl:w-2/5 2xl:w-2/5 m-auto rounded-lg shadow-lg py-8 px-12 bg-white">
            <button type="button" onClick={close}>X</button>
            <h2 class="text-center text-lg font-bold">New Category</h2>
            <p class="m-1">Category Name:</p>
                <input type="text" class="mt-1 h-10 border shadow-sm rounded-md" value={category} onChange={e => setCategory(e.target.value)} />
            <button type="button" class="my-5 h-10 bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 rounded-md text-white w-1/2 m-auto" onClick={() => {createCategory();close();}}>Create</button>
        </div>
        </>
    )
}

export default NewCategory;
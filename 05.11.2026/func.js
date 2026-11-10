
export function create_new_task (text , task_list , tuple, func){
    if(!text){return;}

    let new_task = document.createElement('div');
    new_task.classList.add('onetask');

    new_task.innerHTML = `
    
        <input type="checkbox" class="checkbox">
        <span class="task-text-cont">
            <p class="task-text">${text}</p>
        </span>
        <button class="edit-btn">edit</button>
        <button class="del-btn">del</button>

    `

    let check = new_task.querySelector(".checkbox");
    let edit = new_task.querySelector(".edit-btn");
    let del = new_task.querySelector(".del-btn");
   
    let textContainer = new_task.querySelector(".task-text-cont")

    check.addEventListener('change' , () =>{
         let task_text = new_task.querySelector(".task-text");
        if(check.checked){
            task_text.style.textDecoration = 'line-through';
            task_text.style.opacity = '0.7';
            tuple[1] += 1;
           
        }
        else{
             task_text.style.textDecoration = 'none';
            task_text.style.opacity = '1';
            tuple[1] -= 1;
            
        }
        func();
    })

    del.addEventListener('click' , () => {
        if(check.checked){
            tuple[1] -= 1;
        }
        tuple[0] -= 1;
        new_task.remove();
        func();
    })

    edit.addEventListener('click', () => {
        const taskText = new_task.querySelector('.task-text');
        
        
        if (!taskText) return;

        const oldText = taskText.textContent;

        edit.style.display = 'none';
        del.style.display = 'none';

        textContainer.innerHTML = `
            <input type="text" class="edit-input" placeholder="${oldText}" value="${oldText}">
            <button class="save-btn">✓</button>
            <button class="cancel-btn">✗</button>
        `;

        const editInput = new_task.querySelector('.edit-input');
        const saveBtn = new_task.querySelector('.save-btn');
        const cancelBtn = new_task.querySelector('.cancel-btn');

        editInput.focus();
        editInput.setSelectionRange(editInput.value.length, editInput.value.length);

        const restoreText = (innerText) => {
        textContainer.innerHTML = `<p class="task-text">${innerText}</p>`;
        
        edit.style.display = 'inline-block';
        del.style.display = 'inline-block';

        const updatedText = textContainer.querySelector('.task-text');
        if (check.checked) {
            updatedText.style.textDecoration = 'line-through';
            updatedText.style.opacity = '0.7';
        }
        };

        
        
        saveBtn.addEventListener('click', () => {
            const newText = editInput.value.trim();
   
            restoreText(newText !== '' ? newText : oldText);
        });

       
        cancelBtn.addEventListener('click', () => {
            restoreText(oldText);
        });

        
        editInput.addEventListener('keydown', (butt) => {
            if (butt.key === 'Enter') {
                saveBtn.click();
            }
            if (butt.key === 'Escape') {
                cancelBtn.click();
            }
        });
    });

    task_list.append(new_task);
    tuple[0] += 1;
    func();

}


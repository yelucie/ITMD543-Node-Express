document.addEventListener("DOMContentLoaded", (event) => {
    // Upload the file
    const input = document.getElementById("upload");
    input.addEventListener("change", (evt) => {
        const fileUploaded = evt.target.files[0];

        if (fileUploaded) {
            let fileName = fileUploaded.name;
            let fileType = fileName.split(".").pop();
            fileShow(fileName, fileType);

            var data = new FormData()
            data.append('file', input.files[0])

            fetch('/upload', {
                method: 'POST',
                body: data
            })
        }
    });

    // Fetch the list of documents
    fetch("/files")
        .then(res => res.json())
        .then(data => {
            data.forEach(file => {
                fileShow(file.name, file.name.split(".").pop());
            });
        })
})

// Show on the page
function fileShow(fileName, fileType) {
    const fileContainer = document.createElement('div');
    fileContainer.classList.add("showFile");

    // Left container (type and title)
    const leftContainer = document.createElement('div');
    leftContainer.classList.add("left");
    // Show the file's type
    const type = document.createElement('span');
    type.classList.add("filetype");
    type.innerHTML = fileType;
    // Show the file's title
    const title = document.createElement('h3');
    title.innerHTML = fileName;
    // Add the type and title components to the left container
    leftContainer.appendChild(type);
    leftContainer.appendChild(title);

    // Right container (download button and delete cross)
    const rightContainer = document.createElement('div');
    rightContainer.classList.add("right");
    // Show the download button
    const download = document.createElement('img');
    download.src = 'downloadIcon.png';
    download.alt = 'Download';
    download.addEventListener("click", () => {
        downloadFile(fileName);
    });
    // Show the delete cross
    const remove = document.createElement('span');
    remove.innerHTML = "&#215;";
    remove.addEventListener("click", () => {
        removeFile(fileName, fileContainer);
    })
    // Add the download and remove components to the right container
    rightContainer.appendChild(download);
    rightContainer.appendChild(remove);

    fileContainer.appendChild(leftContainer);
    fileContainer.appendChild(rightContainer);

    files.appendChild(fileContainer);
}

function downloadFile(fileName) {
    window.location.href = `./files/${fileName}`;
}

function removeFile(fileName, fileContainer) {
    fetch(`/files/delete/${fileName}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to delete file: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            fileContainer.remove();
        })
}
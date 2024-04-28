document.getElementById('mergeBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    
    if (files.length < 2) {
        alert('Please select at least two PDF files.');
        return;
    }

    const formData = new FormData();
    for (const file of files) {
        formData.append('pdfFiles', file);
    }

    try {
        const response = await fetch('/merge', {
            method: 'POST',
            body: formData
        });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'merged.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); // Release the object URL
        document.body.removeChild(a); // Clean up the anchor element
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while merging PDFs.');
    }
});

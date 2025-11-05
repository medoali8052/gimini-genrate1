async function updateCounter() {
    let res = await fetch('/.netlify/functions/generateVideo', { method: 'GET' });
    let data = await res.json();
    document.getElementById('videosCounter').innerText =
        `إجمالي الفيديوهات المتاحة: ${data.remain} من أصل ${data.max}`;
}

document.addEventListener("DOMContentLoaded", updateCounter);

document.getElementById('videoForm').onsubmit = async function(e) {
    e.preventDefault();
    let prompt = document.getElementById('prompt').value;
    let imageFile = document.getElementById('image').files[0];
    let formData = new FormData();
    formData.append('prompt', prompt);
    if(imageFile) formData.append('image', imageFile);

    let res = await fetch('/.netlify/functions/generateVideo', {
        method: 'POST',
        body: formData
    });
    let data = await res.json();
    document.getElementById('result').innerText = data.message || data.error;
    await updateCounter();
};

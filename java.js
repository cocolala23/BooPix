// Ambil elemen
const video = document.getElementById('video');
const captureButton = document.getElementById('capture');
const saveButton = document.getElementById('save-photo');
const canvases = [
    document.getElementById('canvas1'),
    document.getElementById('canvas2'),
    document.getElementById('canvas3'),
    document.getElementById('canvas4')
];

let photoIndex = 0;

// Aktifkan Kamera
document.createElement
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing camera: ", err);
    });

// Event listener for the Snap Your Life button
document.getElementById('snapButton').addEventListener('click', function() {
    window.location.href = 'photoPage.html';
});

// Tangkap Foto & Masukkan ke Frame
captureButton.addEventListener('click', () => {
    console.log("Capture button clicked");

    if (photoIndex < 4) {
        const context = canvases[photoIndex].getContext('2d');
        context.drawImage(video, 0, 0, canvases[photoIndex].width, canvases[photoIndex].height);
        photoIndex++;
    } else {
        alert("Frame sudah penuh! Simpan atau hapus foto sebelum mengambil yang baru.");
    }
});

// Simpan Foto ke Galeri
saveButton.addEventListener('click', () => {
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = 200;
    finalCanvas.height = 600; // Sesuai ukuran 4 gambar

    const finalContext = finalCanvas.getContext('2d');

    // Gabungkan 4 gambar ke dalam 1 file
    canvases.forEach((canvas, index) => {
        finalContext.drawImage(canvas, 0, index * 150, 200, 150);
    });

    // Download hasil foto
    const link = document.createElement('a');
    link.download = 'BooPix-Photo.png';
    link.href = finalCanvas.toDataURL();
    link.click();
});

// Fungsi kembali ke halaman utama
function goBack() {
    window.location.href = "index.html";
}

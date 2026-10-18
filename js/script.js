
"use strict";
// DOM 1: MENGUBAH JUDUL DAN INFORMASI LANDING PAGE
const btnUbahTeks = document.getElementById("btnUbahTeks");
const judulLanding = document.getElementById("judulLanding");
const infoLanding = document.getElementById("infoLanding");

if (btnUbahTeks && judulLanding && infoLanding) {
    btnUbahTeks.addEventListener("click", function () {
        judulLanding.textContent =
            "Rawat Kendaraan Lebih Mudah Bersama AutoCare";

        infoLanding.textContent =
            "Booking online, pantau jadwal, dan kelola riwayat servis kendaraan Anda dalam satu tempat.";

        tampilkanToast("Informasi AutoCare berhasil diperbarui");
    });
}
// DOM 2: MENGUBAH TEMA HALAMAN
const btnTema = document.getElementById("btnTema");

if (btnTema) {
    btnTema.addEventListener("click", function () {
        document.body.classList.toggle("tema-alternatif");

        const temaAktif =
            document.body.classList.contains("tema-alternatif");

        btnTema.textContent = temaAktif
            ? "Kembalikan Tema"
            : "Ganti Tema";

        tampilkanToast(
            temaAktif
                ? "Tema alternatif berhasil diaktifkan"
                : "Tema awal berhasil dikembalikan"
        );
    });
}


// DOM 3: MENAMBAHKAN DAN MENGHAPUS ELEMEN HTML
const btnFitur = document.getElementById("btnFitur");
const areaFitur = document.getElementById("areaFitur");

if (btnFitur && areaFitur) {
    btnFitur.addEventListener("click", function () {
        const fiturLama = document.getElementById("fiturTambahan");

        if (fiturLama) {
            fiturLama.remove();
            btnFitur.textContent = "Tampilkan Fitur";

            tampilkanToast("Fitur tambahan berhasil disembunyikan");
        } else {
            const fiturBaru = document.createElement("article");

            fiturBaru.id = "fiturTambahan";
            fiturBaru.className = "service-card fitur-baru";

            const nomor = document.createElement("div");
            nomor.className = "service-icon";
            nomor.textContent = "04";

            const judul = document.createElement("h3");
            judul.textContent = "Pengingat Servis";

            const deskripsi = document.createElement("p");
            deskripsi.textContent =
                "Bantu ingat jadwal perawatan kendaraan agar tidak terlewat.";

            fiturBaru.appendChild(nomor);
            fiturBaru.appendChild(judul);
            fiturBaru.appendChild(deskripsi);

            areaFitur.appendChild(fiturBaru);

            btnFitur.textContent = "Sembunyikan Fitur";

            tampilkanToast("Fitur tambahan berhasil ditampilkan");
        }
    });
}


// TOAST / SNACKBAR 

const toastAutoCare = document.getElementById("toastAutoCare");
let timerToast;

function tampilkanToast(pesan) {
    if (!toastAutoCare) {
        return;
    }

    toastAutoCare.textContent = pesan;
    toastAutoCare.classList.add("toast-tampil");

    clearTimeout(timerToast);

    timerToast = setTimeout(function () {
        toastAutoCare.classList.remove("toast-tampil");
    }, 3000);
}

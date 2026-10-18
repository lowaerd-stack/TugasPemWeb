
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const layanan = document.getElementById("layanan");
    const tombolBooking = form?.querySelector(
        'button[type="submit"], input[type="submit"]'
    );

    // Membuat tempat untuk menampilkan informasi layanan
    if (layanan && !document.getElementById("info-layanan")) {
        const info = document.createElement("p");
        info.id = "info-layanan";
        info.style.marginTop = "10px";
        info.style.color = "#f59e0b";
        layanan.insertAdjacentElement("afterend", info);
    }

    // EVENT 1: Change
    // Menampilkan layanan yang dipilih pengguna
    if (layanan) {
        layanan.addEventListener("change", function () {
            document.getElementById("info-layanan").textContent =
                this.value
                    ? "Layanan yang dipilih: " + this.options[this.selectedIndex].text
                    : "";
        });
    }

    // EVENT 2: Click
    // Memberikan efek ketika tombol booking diklik
    if (tombolBooking) {
        tombolBooking.addEventListener("click", function () {
            this.style.opacity = "0.85";

            setTimeout(() => {
                this.style.opacity = "";
            }, 250);
        });
    }

    // EVENT 3: Submit
    // Validasi, konfirmasi, dan penyimpanan data booking
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const kendaraan = document.getElementById("kendaraan");
            const tanggal = document.getElementById("tanggal");
            const waktu = document.getElementById("waktu");
            const workshop = document.getElementById("workshop");
            const keluhan = document.getElementById("keluhan");

            // Validasi elemen form yang tersedia
            const wajibDiisi = [
                kendaraan, layanan, tanggal, waktu, workshop
            ].filter(Boolean);

            const belumDiisi = wajibDiisi.some(
                (input) => !input.value.trim()
            );

            if (belumDiisi) {
                alert("Mohon lengkapi data booking terlebih dahulu.");
                return;
            }

            // POP-UP 1: Confirm Box
            const konfirmasi = confirm(
                "Apakah Anda yakin ingin membuat booking servis?"
            );

            if (!konfirmasi) {
                return;
            }

            const dataBooking = {
                kendaraan: kendaraan?.value || "",
                layanan: layanan?.value || "",
                tanggal: tanggal?.value || "",
                waktu: waktu?.value || "",
                workshop: workshop?.value || "",
                keluhan: keluhan?.value || "",
                status: "Menunggu",
                dibuatPada: new Date().toISOString()
            };

            try {
                // WEB STORAGE: menyimpan data booking di browser
                const key = "autocare_bab4_bookings";
                const dataLama = JSON.parse(
                    localStorage.getItem(key) || "[]"
                );

                dataLama.push(dataBooking);
                localStorage.setItem(key, JSON.stringify(dataLama));

                // ASYNCHRONOUS + PROMISE
                // Memberikan jeda singkat sebelum proses dilanjutkan
                await new Promise((resolve) => setTimeout(resolve, 500));

                // POP-UP 2: Alert Box
                alert("Booking berhasil disimpan!");

                // Melanjutkan pengiriman form ke jadwal.html
                // tanpa menjalankan event submit ini untuk kedua kalinya
                HTMLFormElement.prototype.submit.call(form);
            } catch (error) {
                console.error("Gagal menyimpan booking:", error);
                alert("Booking gagal disimpan. Periksa penyimpanan browser.");
            }
        });
    }
});

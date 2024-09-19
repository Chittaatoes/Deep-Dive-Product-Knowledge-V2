// Simpan state chart secara otomatis saat ada perubahan
const chartContainer = document.getElementById('chart-container');
if (chartContainer) {
    chartContainer.addEventListener('DOMSubtreeModified', saveChartState);
}

// Simpan state textarea secara otomatis saat ada perubahan
const textArea = document.getElementById('content');
if (textArea) {
    textArea.addEventListener('input', saveTextAreaState);
}

// Simpan state sold-out secara otomatis saat ada perubahan pada elemen terkait (bisa disesuaikan)
document.body.addEventListener('click', function(event) {
    if (event.target.matches('.sold-out-toggle')) { // Misalnya class untuk tombol toggle sold-out
        saveSoldOutState();
    }
});

// Fungsi untuk menandai menu sebagai "sold out"
function showSoldOut(menuItem) {
    const soldOutMessage = menuItem.querySelector('.sold-out-message');
    if (soldOutMessage) {
        soldOutMessage.style.display = 'block'; // Tampilkan pesan "sold out"
    }
}


// Simpan status chart ke Local Storage
function saveChartState() {
    localStorage.setItem('chartState', JSON.stringify(chart));
}

// Simpan status sold out ke Local Storage
function saveSoldOutState() {
    const soldOutItems = Array.from(document.querySelectorAll('.sold-out-message')).map(item => {
        const menuName = item.previousElementSibling.querySelector('.category-info h3').innerText;
        return menuName;
    });
    localStorage.setItem('soldOutState', JSON.stringify(soldOutItems));
}

// Simpan teks area ke Local Storage
function saveTextAreaState() {
    const content = document.getElementById('content').value;
    localStorage.setItem('textAreaState', content);
}

// Panggil fungsi simpan sebelum halaman ditinggal
window.onbeforeunload = function () {
    saveChartState();
    saveSoldOutState();
    saveTextAreaState();
};

// Muat status chart dari Local Storage
function loadChartState() {
    const savedChart = localStorage.getItem('chartState');
    if (savedChart) {
        Object.assign(chart, JSON.parse(savedChart));
        displayChart();
    }
}

// Muat status sold out dari Local Storage
function loadSoldOutState() {
    const savedSoldOutItems = localStorage.getItem('soldOutState');
    if (savedSoldOutItems) {
        const soldOutItems = JSON.parse(savedSoldOutItems);
        soldOutItems.forEach(menuName => {
            const items = document.querySelectorAll('.menu-categories');
            items.forEach(item => {
                const categoryInfo = item.querySelector('.category-info h3');
                if (categoryInfo && categoryInfo.innerText === menuName) {
                    showSoldOut(categoryInfo.closest('.category-item'));
                }
            });
        });
    }
}

// Muat teks area dari Local Storage
function loadTextAreaState() {
    const savedContent = localStorage.getItem('textAreaState');
    if (savedContent) {
        document.getElementById('content').value = savedContent;
    }
}


// Memuat status halaman ketika dokumen siap
window.onload = function () {
    loadState();
};

// Menyimpan status setiap perubahan dilakukan
window.onbeforeunload = function () {
    saveState();
};

document.addEventListener('DOMContentLoaded', function() {
    // Load states on page load
    loadChartState();
    loadSoldOutState();
    loadTextAreaState();


     // Tambahkan event listener untuk perubahan
     const chartContainer = document.getElementById('chart-container');
     if (chartContainer) {
         chartContainer.addEventListener('DOMSubtreeModified', saveChartState);
     }
 
     const textArea = document.getElementById('content');
     if (textArea) {
         textArea.addEventListener('input', saveTextAreaState);
     }
 
     document.body.addEventListener('click', function(event) {
         if (event.target.matches('.sold-out-toggle')) { // Misalnya class untuk tombol toggle sold-out
             saveSoldOutState();
         }
     });
    // Existing event listeners...
});



document.addEventListener('DOMContentLoaded', function() {
    const clearSearchButton = document.getElementById('clear-search');
    const searchInput = document.getElementById('search-input');
    const clearSpecialRequestButton = document.getElementById('clear-special-request');
    const specialRequestInput = document.getElementById('special-request');

    // Event listener untuk tombol "x" di search input
    clearSearchButton.addEventListener('click', function() {
        searchInput.value = ''; // Hapus teks di input search
        searchInput.focus(); // Fokuskan input search jika diperlukan
        searchMenu(); // Panggil fungsi pencarian untuk menyembunyikan item jika diperlukan
    });

    // Event listener untuk tombol "x" di special request input
    clearSpecialRequestButton.addEventListener('click', function() {
        specialRequestInput.value = ''; // Hapus teks di special request input
        specialRequestInput.focus(); // Fokuskan special request input jika diperlukan
    });

    // Toggle search box visibility
    window.toggleSearchBox = function() {
        const searchBox = document.getElementById('searchBox');
        if (searchBox.style.display === 'none' || !searchBox.style.display) {
            searchBox.style.display = 'flex'; // Menampilkan search box
            searchInput.focus(); // Fokus pada input search
        } else {
            searchBox.style.display = 'none'; // Menyembunyikan search box
        }
    };
});
document.addEventListener('DOMContentLoaded', function () {
    const homeButton = document.querySelector('.footer .home');

    homeButton.addEventListener('click', function (event) {
        event.preventDefault(); // Mencegah perilaku default klik
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Scroll ke atas secara halus
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const chatMenu = document.querySelector('.footer .chat');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) { // Tampilkan tombol jika scroll lebih dari 300px
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll ke atas secara halus
    });

    chatMenu.addEventListener('click', function (event) {
        event.preventDefault(); // Mencegah perilaku default klik
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Scroll ke atas secara halus
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const scrollToBottomBtn = document.getElementById('scroll-to-bottom');
    const chartContainer = document.getElementById('chart-container');

    scrollToBottomBtn.addEventListener('click', function() {
        chartContainer.scrollIntoView({
            behavior: 'smooth', // Smooth scrolling
            block: 'start'      // Align to the top of the viewport
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Tunggu beberapa detik sebelum menghapus loading screen (misalnya 2 detik)
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        
        // Sembunyikan loading screen
        loadingScreen.style.opacity = '0';
        loadingScreen.style.pointerEvents = 'none'; // Nonaktifkan interaksi dengan loading screen
        
        // Tampilkan konten utama
        mainContent.style.display = 'block';
        mainContent.style.opacity = '1';
    }, 2000); // Ganti dengan durasi yang diinginkan
});

document.addEventListener('DOMContentLoaded', function() {
    const notificationPopup = document.getElementById('notification-popup');
    const notificationClose = document.getElementById('notification-close');

    // Tampilkan popup setelah 3 detik
    setTimeout(function() {
        notificationPopup.classList.add('show');
    }, 10000);

    // Tutup popup saat tombol close ditekan
    notificationClose.addEventListener('click', function() {
        notificationPopup.classList.remove('show');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const kategoriItems = document.querySelectorAll('.kategori-item');

    kategoriItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.querySelector(`#${targetId}`);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Smooth scrolling
                    block: 'start'      // Align to the top of the viewport
                });
            }
        });
    });
});

const chart = {};
const clickCounts = {};
const clickTimers = {};
const menusWithDoneness = [
    'Black Angus Striploin O’Connor Beef 300gr',
    /* 'Wagyu Beef Bourguignon', */
    'Australian Rib-eye Steak',
    'Steak Frites',
    'Beef Tongue'
];

function playSound() {
    const sound = document.getElementById('ting-sound');
    sound.play();
}

function handleClick(itemName, element = null) {
    // Handle click event
    console.log("Clicked on:", itemName);
    if (element) {
        // Do something with the element if needed
        console.log("Element clicked:", element);
    }
}


// Menambahkan variabel global untuk chart dan clickCounts
/* const clickCounts = {};
const clickTimers = {};
const chart = {};
const menusWithDoneness = ['Black Truffle Penne', 'Creamy Spaghetti Carbonara with Chicken']; // Update with your actual menu names
 */
function handleClick(menuName, element) {
    const now = new Date();
    const hour = now.getHours();
    
    // Daftar menu yang memerlukan cek waktu
    const timeSensitiveMenus = ['The OG Scrambled Egg', 'Breakfast Burger', 'Chicken Quesadilla'];
    
    if (timeSensitiveMenus.includes(menuName)) {
        if (hour >= 7 && hour < 10) {
            if (!clickCounts[menuName]) {
                clickCounts[menuName] = 0;
            }

            clickCounts[menuName] += 1;

            clearTimeout(clickTimers[menuName]);

            clickTimers[menuName] = setTimeout(() => {
                if (clickCounts[menuName] === 2) {
                    addToChart(menuName, element);
                } else if (clickCounts[menuName] === 3) {
                    removeFromChart(menuName);
                } else if (clickCounts[menuName] === 4) {
                    showSoldOut(element);
                }
                clickCounts[menuName] = 0; // Reset click count
            }, 300); // Sesuaikan delay jika perlu
        } else {
            alert('Menu ini hanya bisa dipesan antara pukul 07:00 - 10:00.');
        }
    } else {
        if (!clickCounts[menuName]) {
            clickCounts[menuName] = 0;
        }

        clickCounts[menuName] += 1;

        clearTimeout(clickTimers[menuName]);

        clickTimers[menuName] = setTimeout(() => {
            if (clickCounts[menuName] === 2) {
                addToChart(menuName, element);
            } else if (clickCounts[menuName] === 3) {
                removeFromChart(menuName);
            } else if (clickCounts[menuName] === 4) {
                showSoldOut(element);
            }
            clickCounts[menuName] = 0; // Reset click count
        }, 300); // Sesuaikan delay jika perlu
    }
}

function showSoldOut(element) {
    const parentCategory = element.closest('.menu-categories');
    
    // Ambil nama menu dari elemen h3 di dalam .category-info
    const menuName = parentCategory.querySelector('.category-info h3').innerText;

    // Cek apakah sudah ada elemen "Sold Out", jika belum tambahkan
    let soldOutElement = parentCategory.querySelector('.sold-out-message');
    
    if (!soldOutElement) {
        soldOutElement = document.createElement('div');
        soldOutElement.className = 'sold-out-message';
        soldOutElement.innerText = `${menuName} Sold Out`; // Tambahkan nama menu ke dalam teks
        
        // Tempatkan elemen Sold Out di atas category-item
        parentCategory.insertBefore(soldOutElement, parentCategory.firstChild);
        
        // Tambahkan efek transisi setelah ditambahkan
        setTimeout(() => {
            soldOutElement.classList.add('show', 'pulse');
        }, 10); // Delay kecil untuk memastikan transisi diterapkan

        // Tambahkan kelas latar belakang "sold out"
        parentCategory.classList.add('sold-out-background');

        // Event listeners for long press on desktop
        let pressTimer;
        soldOutElement.addEventListener('mousedown', () => {
            pressTimer = setTimeout(() => {
                removeSoldOut(soldOutElement);
            }, 1500); // 1.5 seconds long press
        });

        soldOutElement.addEventListener('mouseup', () => {
            clearTimeout(pressTimer);
        });

        soldOutElement.addEventListener('mouseleave', () => {
            clearTimeout(pressTimer);
        });

        // Event listeners for long press on mobile
        soldOutElement.addEventListener('touchstart', () => {
            pressTimer = setTimeout(() => {
                removeSoldOut(soldOutElement);
            }, 1500); // 1.5 seconds long press
        });

        soldOutElement.addEventListener('touchend', () => {
            clearTimeout(pressTimer);
        });

        soldOutElement.addEventListener('touchcancel', () => {
            clearTimeout(pressTimer);
        });
    }
}

function removeSoldOut(soldOutElement) {
    if (soldOutElement) {
        soldOutElement.classList.add('remove');
        const parentCategory = soldOutElement.closest('.menu-categories');
        setTimeout(() => {
            soldOutElement.remove();
            // Kembalikan latar belakang ke keadaan semula
            parentCategory.classList.remove('sold-out-background');
        }, 500); // Waktu untuk menghapus elemen setelah animasi keluar selesai
    }
}

// Daftar menu yang memerlukan opsi suhu (Hot / Iced)
// Daftar menu yang memerlukan opsi suhu (Hot / Iced)
const menusWithTemperatureOptions = ['Cafe Long Black', 'Cafe Cappuccino', 'Cafe Oat Cappucino', 'Cafe Mocha', 'Cafe Latte', 'Vanilla Latte', 'Caramel latte', 'Hazelnut Latte', 'Creme brulee latte', 'Oat Latte', 'Pistachio Cookie Coffe Latte', 'Indulgent Chocolate', 'Indulgent Chocolate With Oat Milk', 'Fluffy Marshmallow Chocolate', 'Chocolate Crumble Latte']; // Tambahkan menu lainnya jika diperlukan

function addToChart(menuName, element) {
    const parentCategory = element.closest('.menu-categories');
    const soldOutElement = parentCategory.querySelector('.sold-out-message');

    // Cek apakah menu tersebut Sold Out
    if (soldOutElement) {
        showNotification(menuName, 'error');
        return; // Jangan tambahkan ke chart jika sold out
    }

    // Periksa apakah menu memerlukan opsi suhu sebelum ditambahkan ke chart
    if (menusWithTemperatureOptions.includes(menuName)) {
        let temperature = prompt('Pilih Varian: Hot atau Ice (Ketik Hot / Ice).');
        if (!temperature || (temperature.toLowerCase() !== 'hot' && temperature.toLowerCase() !== 'ice')) {
            alert('Silakan pilih antara "Hot" atau "Iced".'); // Validasi input suhu
            return; // Kembali jika input tidak valid
        }
        // Format nama menu berdasarkan pilihan suhu
        menuName = `${temperature.charAt(0).toUpperCase() + temperature.slice(1).toLowerCase()} ${menuName}`;
    }

    // Jika tidak sold out, tambahkan ke chart
    if (!chart[menuName]) {
        chart[menuName] = 0;
    }
    chart[menuName] += 1;
    displayChart();

    // Memeriksa jika menu memerlukan tingkat kematangan
    if (menusWithDoneness.includes(menuName)) {
        const doneness = prompt('Input tingkat kematangan: rare, medium rare, medium, medium well, or well done.');
        if (doneness) {
            chart[menuName] = { quantity: chart[menuName], doneness: doneness };
        }
    }

    // Mainkan suara setelah menambahkan ke chart
    playSound();
}


function showNotification(menuName, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = `${menuName} SOLDOUT`;

    // Tambahkan elemen notifikasi ke body
    document.body.appendChild(notification);

    // Tambahkan animasi transisi dan efek interaktif
    setTimeout(() => {
        notification.classList.add('show', 'bounce');
    }, 10);

    // Hapus notifikasi setelah beberapa detik
    setTimeout(() => {
        notification.classList.remove('show', 'bounce');
        setTimeout(() => {
            notification.remove();
        }, 300); // Waktu untuk menghapus elemen setelah animasi keluar selesai
    }, 3000); // Durasi tampilan notifikasi
}


function displayChart() {
    const chartList = document.getElementById('chart-list');
    chartList.innerHTML = '';
    for (const [menuName, value] of Object.entries(chart)) {
        let quantity = value;
        let doneness = '';
        if (typeof value === 'object') {
            quantity = value.quantity;
            doneness = value.doneness ? ` (${value.doneness})` : '';
        }
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="chart-item">
                <span class="menu-name">${menuName}${doneness} x${quantity}</span>
                <div class="quantity-controls">
                    <button onclick="increaseQuantity('${menuName}')">+</button> 
                    <button onclick="decreaseQuantity('${menuName}')">-</button>
                </div>
            </div>
        `;
        chartList.appendChild(li);
    }
}


function removeFromChart(menuName) {
    if (chart[menuName]) {
        chart[menuName] = chart[menuName] - 1;
        if (chart[menuName] === 0) {
            delete chart[menuName];
        }
        displayChart();
        alert(`${menuName} telah di kurangi dari pesanan.`);
    }
}

function increaseQuantity(menuName) {
    if (chart[menuName]) {
        if (typeof chart[menuName] === 'object') {
            chart[menuName].quantity += 1;
        } else {
            chart[menuName] += 1;
        }
        displayChart();
    }
}

function decreaseQuantity(menuName) {
    if (chart[menuName]) {
        if (typeof chart[menuName] === 'object') {
            chart[menuName].quantity -= 1;
            if (chart[menuName].quantity === 0) {
                delete chart[menuName];
            }
        } else {
            chart[menuName] -= 1;
            if (chart[menuName] === 0) {
                delete chart[menuName];
            }
        }
        displayChart();
    }
}

let selectedTableNumber = 'null'; // Inisialisasi dengan nilai default

// Event listener untuk menangkap nomor meja yang dipilih
document.querySelectorAll('.table').forEach(table => {
    table.addEventListener('click', function() {
        selectedTableNumber = table.getAttribute('data-table'); // Simpan nomor meja yang dipilih
        alert(`Table ${selectedTableNumber} Dipilih!`); // Opsional: Memberikan notifikasi bahwa meja telah dipilih
    });
});

async function sendOrder() {
    // Gunakan nomor meja yang dipilih dari variabel selectedTableNumber
    let tableNumber = selectedTableNumber;

    const orderItems = Object.entries(chart).map(([menuName, value]) => {
        const quantity = typeof value === 'object' ? value.quantity : value;
        const doneness = typeof value === 'object' ? ` (${value.doneness})` : '';
        return quantity > 1 ? `${menuName}${doneness} x${quantity}` : `${menuName}${doneness}`;
    });

    let specialRequest = document.getElementById('special-request').value.trim();

    // Daftar kata kunci yang menunjukkan nomor meja harus dihilangkan
    const removeTableKeywords = ["T.", "T ", "t.", "t ", "table", "Table", "Tabble", "Meja", "meja"];
    
    // Cek jika specialRequest mengandung salah satu kata kunci di removeTableKeywords
    const shouldRemoveTable = removeTableKeywords.some(keyword => specialRequest.includes(keyword));
    
    if (shouldRemoveTable) {
        tableNumber = ''; // Hapus nomor meja dari pesan
        alert('Nomor meja dihilangkan. Lihat NOTE.');
    }

    // Format pesan dengan setiap item pada baris baru
    const orderMessage = `
${tableNumber ? `TABLE: ${tableNumber}\n` : ''}
Order:
${orderItems.join('\n')}
${specialRequest ? `\nNOTE: ${specialRequest}` : ''}`.trim(); // Trim to remove any leading/trailing whitespace

    // Copy the order message to the clipboard
    try {
        await navigator.clipboard.writeText(orderMessage);
        alert('Pesanan telah disalin ke clipboard. Mengarahkan ke WhatsApp...');
        
        // Redirect to WhatsApp with the message
        const encodedMessage = encodeURIComponent(orderMessage);
        window.location.href = `https://wa.me/6285172352402?text=${encodedMessage}`;
    } catch (err) {
        alert('Gagal menyalin ke clipboard. Silakan coba lagi.');
    }
}






/* window.addEventListener('beforeunload', function (e) {
    if (Object.keys(chart).length > 0) {
        const orderItems = Object.entries(chart).map(([menuName, value]) => {
            const quantity = typeof value === 'object' ? value.quantity : value;
            const doneness = typeof value === 'object' ? ` (${value.doneness})` : '';
            return quantity > 1 ? `${menuName}${doneness} x${quantity}` : `${menuName}${doneness}`;
        });
        const orderMessage = `Order Anda sebelum meninggalkan halaman ini: ${orderItems.join(', ')}`;
        
        // Copy the order message to the clipboard
        navigator.clipboard.writeText(orderMessage).then(() => {
            alert(orderMessage);
        }).catch(err => {
            alert('Gagal menyalin order ke clipboard.');
        });

        const confirmationMessage = "Apakah Anda yakin ingin meninggalkan halaman ini?";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    }
});
 */
// Script untuk mengaktifkan input dan menampilkan keyboard
function toggleSearchBox() {
    var searchBox = document.getElementById("searchBox");
    var searchInput = document.getElementById("search-input");

    // Menampilkan kotak pencarian jika belum terlihat
    if (searchBox.style.display === "none" || !searchBox.style.display) {
        searchBox.style.display = "block";
    }

    // Fokus ke input pencarian untuk menampilkan keyboard
    searchInput.focus();
}

// Tambahkan event listener untuk menutup keyboard jika pengguna klik di luar kotak pencarian
document.addEventListener('click', function(event) {
    var searchBox = document.getElementById("searchBox");
    var searchInput = document.getElementById("search-input");
    var floatingButton = document.getElementById("floating-search-button");
    var textAreas = document.getElementsByTagName('textarea');

    // Cek jika klik di luar kotak pencarian, floating button, dan textarea
    var clickedOutside = !searchBox.contains(event.target) && 
                        !floatingButton.contains(event.target) &&
                        Array.from(textAreas).every(textarea => !textarea.contains(event.target));

    if (clickedOutside) {
        searchInput.blur(); // Menghilangkan fokus dari input pencarian
        searchBox.style.display = "none"; // Menyembunyikan kotak pencarian
    }
});

// Pastikan search box tersembunyi saat pertama kali load
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("searchBox").style.display = "none";
});

function searchMenu() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const menuItems = document.getElementsByClassName('category-item');

    for (let i = 0; i < menuItems.length; i++) {
        const item = menuItems[i];
        const title = item.querySelector('.category-info h3').textContent.toLowerCase();
        const categories = item.getAttribute('data-category').toLowerCase();

        // Tampilkan item jika pencarian sesuai dengan judul atau salah satu kategori
        if (title.includes(input) || categories.includes(input)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    }
}

function clearChart() {
    const confirmation = confirm('Apakah kamu yakin ingin menghapus semua menu dari chart?');
    if (confirmation) {
        for (const menuName in chart) {
            delete chart[menuName];
        }
        displayChart();
    }
}

// Tambahkan ini di bagian akhir script dalam <script> tag
const floatingButton = document.getElementById('floating-search-button');
let isDragging = false;
let offsetX, offsetY;

floatingButton.addEventListener('mousedown', function (e) {
    isDragging = true;
    offsetX = e.clientX - floatingButton.getBoundingClientRect().left;
    offsetY = e.clientY - floatingButton.getBoundingClientRect().top;
});

document.addEventListener('mousemove', function (e) {
    if (isDragging) {
        const left = e.clientX - offsetX;
        const top = e.clientY - offsetY;
        floatingButton.style.left = `${Math.max(0, Math.min(window.innerWidth - floatingButton.offsetWidth, left))}px`;
        floatingButton.style.top = `${Math.max(0, Math.min(window.innerHeight - floatingButton.offsetHeight, top))}px`;
    }
});

document.addEventListener('mouseup', function () {
    isDragging = false;
});

// Touch event handling for mobile devices
floatingButton.addEventListener('touchstart', function (e) {
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - floatingButton.getBoundingClientRect().left;
    offsetY = touch.clientY - floatingButton.getBoundingClientRect().top;
});

document.addEventListener('touchmove', function (e) {
    if (isDragging) {
        const touch = e.touches[0];
        const left = touch.clientX - offsetX;
        const top = touch.clientY - offsetY;
        floatingButton.style.left = `${Math.max(0, Math.min(window.innerWidth - floatingButton.offsetWidth, left))}px`;
        floatingButton.style.top = `${Math.max(0, Math.min(window.innerHeight - floatingButton.offsetHeight, top))}px`;
    }
});

document.addEventListener('touchend', function () {
    isDragging = false;
});

// JavaScript untuk scroll ke atas
document.getElementById('menu-link1').addEventListener('click', function(event) {
    event.preventDefault(); // Mencegah perilaku default klik
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Efek scroll yang mulus
    });
});

// JavaScript untuk scroll ke atas
document.getElementById('menu-link2').addEventListener('click', function(event) {
    event.preventDefault(); // Mencegah perilaku default klik
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Efek scroll yang mulus
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const activityLink = document.getElementById('activity-link');

    activityLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior

        // Redirect to WhatsApp
        window.location.href = 'https://wa.me/6285172352402?';
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Mendapatkan elemen dengan id 'promos'
    const promoSection = document.getElementById("promos");

    // Sembunyikan section promos saat halaman dimuat
    promoSection.style.display = "none";

    // Mendapatkan tombol promo dan home di footer
    const promoButton = document.querySelector(".promo");
    const homeButton = document.querySelector(".home");

    // Fungsi untuk menampilkan section Promo dan scroll ke section ketika tombol promo ditekan
    promoButton.addEventListener("click", function(e) {
        e.preventDefault();
        promoSection.style.display = "block";  // Tampilkan section Promo
        document.querySelector(".content").style.display = "block"; // Tetap tampilkan chart
        
        // Scroll ke section promos
        promoSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Fungsi untuk menyembunyikan section Promo ketika tombol Beranda ditekan
    homeButton.addEventListener("click", function(e) {
        e.preventDefault();
        promoSection.style.display = "none";  // Sembunyikan section Promo
        document.querySelector(".content").style.display = "block"; // Tetap tampilkan chart
    });
});


// Function to show the hidden content when a table number is clicked
document.querySelectorAll('.table').forEach(table => {
    table.addEventListener('click', function() {
        // Show all hidden elements when a table is clicked
        document.querySelectorAll('.container, .kategori-header, .kategori-item, .slider-wrapper, .menu-category-header, .menu-categories, .content, .pad, .category-item').forEach(function(element) {
            element.style.display = 'block';
        });

        // Optionally hide the tables once a table is clicked
        document.querySelector('.containerss').style.display = 'none';
    });
});

window.addEventListener('load', function() {
    // Initially hide all elements except the table section and disable scrolling
    document.querySelectorAll('.container, .kategori-header, .kategori-item, .slider-wrapper, .menu-category-header, .menu-categories, .content, .pad, .category-item').forEach(function(element) {
        element.style.display = 'none';
    });

    // Disable body scroll on load
    document.body.style.overflow = 'hidden';
});

// Function to show hidden content when a table number is clicked
document.querySelectorAll('.table').forEach(table => {
    table.addEventListener('click', function() {
        // Show all hidden elements
        document.querySelectorAll('.container, .kategori-header, .kategori-item, .slider-wrapper, .menu-category-header, .menu-categories, .content, .pad, .category-item').forEach(function(element) {
            element.style.display = 'block';
        });

        // Optionally hide the tables once a table is clicked
        document.querySelector('.containerss').style.display = 'none';

        // Re-enable scrolling after a table is clicked
        document.body.style.overflow = 'auto';  // This will allow normal scrolling behavior
    });
});





document.querySelectorAll('.table').forEach(table => {
    table.addEventListener('click', function() {
        // Show all hidden elements, restoring their appropriate display styles
        document.querySelector('.container').style.display = 'flex';  // Use 'block' for container if it's block-level
        document.querySelector('.slider-wrapper').style.display = 'grid';  // If the slider uses flexbox
        document.querySelectorAll('.kategori-item').forEach(function(item) {
            item.style.display = 'inline-block';  // Use 'inline-block' if that's what they should be
        });
        document.querySelectorAll('.menu-category-header').forEach(function(header) {
            header.style.display = 'block';  // Block-level element for headers
        });
        document.querySelectorAll('.menu-categories').forEach(function(category) {
            category.style.display = 'grid';  // Flex if the categories are in a flex container
        });
        document.querySelector('.content').style.display = 'block';  // Block for the chart content
        document.querySelector('.pad').style.display = 'grid';  // Use block for this section too

        // Optionally hide the tables once a table is clicked
        document.querySelector('.containerss').style.display = 'none';
    });
});


const cars = [
    {
        id: 1,
        name: "รถบรรทุก",
        image: "Car.jpg",
        status: true,
    },
    {
        id: 2,
        name: "รถกระบะ",
        image: "Toyota.jpg",
        status: true,
    },
    {
        id: 3,
        name: "รถบรรทุก",
        image: "car3.jpeg",
        status: false,
    },
    {
        id: 4,
        name: "รถกระบะ",
        image: "car4.jpg",
        status: false,
    },
    {
        id: 5,
        name: "รถกระบะ",
        image: "car5.jpg",
        status: false,
    },
];

// ฟังก์ชันจำลองการดึงข้อมูล
export function fetchCars() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cars); // ส่งข้อมูลรถกลับหลังจากดีเลย์
        }, ); // ดีเลย์ 1 วินาทีเพื่อจำลอง API
    });
}

// ฟังก์ชันสำหรับเพิ่มรถใหม่
export function addCar(newCar) {
    cars.push({
        id: cars.length + 1, // สร้าง ID ใหม่โดยเพิ่มจากลำดับ
        ...newCar,
    });
    return cars; // ส่งรายการรถที่อัปเดตกลับ
}

// ฟังก์ชันสำหรับกรองรถที่ใช้งานได้
export function getActiveCars() {
    return cars.filter((car) => car.status);
}

const departmentCodes = {
    CSE: '01',
    ECE: '02',
    ME: '03',
    CE: '04',
    EE: '05',
    IT: '06',
    AIDS: '07',
};

const courseCodes = {
    BTECH: '01',
    MTECH: '02',
    PHD: '03',
    DIPLOMA: '04',
}

const collegeCode = '455';

export const genEnrollmentNumber = (year, department, course) => {
    if (!departmentCodes[department] || !courseCodes[course]) {
        throw new Error('Invalid department or course');
    }
    const courseCode = courseCodes[course];
    const departmentCode = departmentCodes[department];
    const uniqueId = Math.floor(Math.random() * 1000);
    return `${year}${collegeCode}${departmentCode}${courseCode}${uniqueId}`;
}

export const genEmployeeId = (department) => {
    if (!departmentCodes[department]) {
        throw new Error('Invalid Department');
    }
    const departmentCode = departmentCodes[department];
    const uniqueId = Math.floor(Math.random() * 100000000);
    return `${collegeCode}${departmentCode}${uniqueId}`
}

export const genAdminId = (department) => {
    if(!departmentCodes[department]) {
        throw new Error('Invalid Department');
    }

    const departmentCode = departmentCodes[department];
    const uniqueId = Math.floor(Math.random() * 100000);
    return `${collegeCode}${departmentCode}${uniqueId}`;
}
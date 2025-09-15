const departmentCodes = {
    CSE: '01',
    ME: '02',
    IT: '03',
    AIDS: '04',
};

const courseCodes = {
    DEGREE: '01',
    DIPLOMA: '02',
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
interface FormData {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
}

interface FormErrors {
    email?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
}

export type { FormData, FormErrors };
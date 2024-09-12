export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    description: string;
    password: string;
    username: string;
    personnel_number: number;
    personio_number: number;
    adress_id: number;
}

export type Adress = {
    street: string;
    plz: string;
    city: string;
}

export type MergedUserAdress = User & Adress;

export type ApiUserResponse = {
    users: Array<User>
}

export type ApiUserDetailResponse = {
    users: Array<MergedUserAdress>
}
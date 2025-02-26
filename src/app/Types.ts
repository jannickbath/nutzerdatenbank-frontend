export type User = {
    id: number | string;
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

export type MicrosoftUser = {
    id: string;
    displayName: string;
    givenName: string;
    surname: string;
    mail: string;
    jobTitle: string;
    mobilePhone: string;
    businessPhones: Array<string>;
    officeLocation: string;
    preferredLanguage: string;
    userPrincipalName: string;
}

export type PersonioUser = {}
export type SnipeITAssets = {}

export type MainUser = MicrosoftUser & PersonioUser & SnipeITAssets;

export type MicrosoftUserResponse = {
    value: Array<MicrosoftUser>
}

export type ApiUserDetailResponse = {
    users: Array<MergedUserAdress>
}

export type ApiTableResponse = {
    tables: Array<string>
};

export type ApiColumnResponse = {
    columns: Object;
};

export type SearchCategory = {
    name: string;
    value: string;
    active: boolean;
}
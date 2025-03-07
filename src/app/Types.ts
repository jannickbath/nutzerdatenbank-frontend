export type MicrosoftUser = {
    id: number | string;
    uuid: string;
    givenName: string;
    surname: string;
    mail: string;
    jobTitle: string;
    mobilePhone: string;
    businessPhones: string;
    displayName: number;
}

export type Adress = {
    street: string;
    plz: string;
    city: string;
}

export type FetchUserOptions = {
    appendUsers: boolean;
}

// export type MergedUserAdress = User & Adress;

export type ApiUserResponse = {
    users: Array<MicrosoftUser>
}

export type PersonioUser = {}
export type SnipeITAssets = {}

export type MainUser = MicrosoftUser & PersonioUser & SnipeITAssets;

export type MicrosoftUserResponse = {
    value: Array<MicrosoftUser>
}

export type ApiUserDetailResponse = {
    users: Array<MicrosoftUser>
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
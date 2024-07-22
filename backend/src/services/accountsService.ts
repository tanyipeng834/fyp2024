import supabase from "../config/supabaseConfig";
import {
    Accounts,
    Admin,
    Age,
    Gender,
    Learner,
    Role,
} from "../models/accountsModel";

/* CREATE */

export async function createLearnerAccount(learner: Learner) {
    const { firstName, lastName, email, dateCreated, age, gender } = learner;

    const { data, error } = await supabase
        .from("accounts")
        .insert({
            firstname: firstName,
            lastname: lastName,
            email: email,
            role: Role.learner,
            dateCreated: dateCreated,
            age: age,
            gender: gender,
        })
        .select();

    if (error) {
        console.error(error);
        throw error;
    } else {
        return data;
    }
}

export async function createAdminAccount(admin: Admin) {
    const { firstName, lastName, email, dateCreated, age, gender } = admin;

    const { data, error } = await supabase
        .from("accounts")
        .insert({
            firstname: firstName,
            lastname: lastName,
            email: email,
            role: Role.admin,
            dateCreated: dateCreated,
            age: age,
            gender: gender,
        })
        .select();

    if (error) {
        console.error(error);
        throw error;
    } else {
        return data;
    }
}

/* READ */

export async function getAllAccounts() {
    const { data, error } = await supabase.from("accounts").select("*");

    if (error) {
        console.error(error);
        throw error;
    } else {
        return data;
    }
}

export async function getAccountById(userid: number): Promise<Learner> {
    const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("userid", userid)
        .single();

    if (error) {
        console.error(error);
        throw error;
    } else {
        const role: Role = data.role === "admin" ? Role.admin : Role.learner;
        const age: Age = Age[data.age as keyof typeof Age];
        const gender: Gender = Gender[data.gender as keyof typeof Gender];

        if (data.role === "admin") {
            return new Admin(
                data.userid,
                data.firstname,
                data.lastname,
                data.email,
                role,
                new Date(data.datecreated!),
                age,
                gender
            );
        }
        return new Learner(
            data.userid,
            data.firstname,
            data.lastname,
            data.email,
            role,
            new Date(data.datecreated!),
            age,
            gender
        );
    }
}

export async function getAllLearnerAccounts() {
    const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("role", "learner");

    if (error) {
        console.error(error);
        throw error;
    } else {
        return data;
    }
}

export async function getAllAdminAccounts() {
    const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("role", "admin");

    if (error) {
        console.error(error);
        throw error;
    } else {
        return data;
    }
}

/* UPDATE */

export async function updateAccount(account: Accounts) {
    const { userId, firstName, lastName, email } = account;

    const updateFields: { [key: string]: any } = {};

    if (firstName) updateFields.firstname = firstName;
    if (lastName) updateFields.lastname = lastName;
    if (email) updateFields.email = email;

    if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
    }

    const { status, statusText, error } = await supabase
        .from("accounts")
        .update(updateFields)
        .eq("userid", userId);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}

/* DELETE */

export async function deleteAccount(userid: number) {
    const { status, statusText, error } = await supabase
        .from("accounts")
        .delete()
        .eq("userid", userid);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
}

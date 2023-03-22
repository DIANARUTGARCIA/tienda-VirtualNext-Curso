import bcrypt from 'bcryptjs';

import { User } from '../models';
import { db } from './';



export const checkUserEmailPassword = async (email: string, password: string) => {

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if (!user) {
        return null;
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return null;
    }

    const { role, name, _id } = user;

    return {
        _id,
        email: email.toLocaleLowerCase(),
        role,
        name,
    }
}

export const oAUthToUser = async (onAuthEmail: string, oAutName: string) => {
    await db.connect();
    const user = await User.findOne({ email: onAuthEmail });
    await db.disconnect();

    if (user) {
        await db.disconnect();
        const { _id, name, email, role } = user;
        return { _id, name, email, role };
    }
    const newUser = new User({ email: onAuthEmail, name: oAutName, password: '@', role: 'client' });
    newUser.save();
    await db.disconnect();
    const { _id, name, email, role } = newUser;
    return { _id, name, email, role };
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAccounts = getAllAccounts;
exports.getAccountById = getAccountById;
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
const accountsModel_1 = require("../models/accountsModel");
function getAllAccounts() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default.from("accounts").select("*");
        if (error) {
            console.error(error);
            return;
        }
        else {
            return data;
        }
    });
}
function getAccountById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default.from("accounts").select("*").eq("id", id).single();
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return new accountsModel_1.Learner(data.userid, data.firstname, data.lastname, data.email, data.role, new Date(data.datecreated), data.age, data.gender);
        }
    });
}

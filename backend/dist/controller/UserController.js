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
exports.UserController = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
function isStrongPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}
class UserController {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    all(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.find();
            return res.json(users);
        });
    }
    one(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const user = yield this.userRepository.findOneBy({ id });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(user);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, profession } = req.body;
            try {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const user = this.userRepository.create({
                    username,
                    password: hashedPassword,
                    profession,
                });
                const savedUser = yield this.userRepository.save(user);
                return res.status(201).json(savedUser);
            }
            catch (error) {
                return res.status(500).json({ message: "Could not save user", error });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, profession } = req.body;
            try {
                const user = yield this.userRepository.findOneBy({ username });
                if (!user ||
                    !(yield bcrypt_1.default.compare(password, user.password)) ||
                    user.profession !== profession) {
                    return res.status(401).json({ message: "Invalid credentials" });
                }
                if (user.blocked) {
                    return res.status(403).json({ message: "User is blocked by admin", user });
                }
                return res.status(200).json({ message: "Login successful", user });
            }
            catch (error) {
                console.error("Login error:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = req.params.username;
            const user = yield this.userRepository.findOneBy({ username });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(user);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const user = yield this.userRepository.findOneBy({ id });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            this.userRepository.merge(user, req.body);
            const result = yield this.userRepository.save(user);
            return res.json(result);
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const result = yield this.userRepository.delete(id);
            if (result.affected === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json({ message: "User deleted successfully" });
        });
    }
    removeAll(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.clear();
            return res.json({ message: "All users removed successfully" });
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, confirmPassword, profession } = req.body;
                const existingUser = yield this.userRepository.findOneBy({ username });
                if (existingUser) {
                    return res.status(400).json({ message: "User already exists" });
                }
                if (password !== confirmPassword) {
                    return res.status(400).json({ message: "Passwords do not match" });
                }
                if (!isStrongPassword(password)) {
                    return res.status(400).json({
                        message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
                    });
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const user = this.userRepository.create({
                    username,
                    password: hashedPassword,
                    profession,
                });
                const savedUser = yield this.userRepository.save(user);
                return res.status(201).json({ message: "User registered successfully", user: savedUser });
            }
            catch (err) {
                console.error("Signup error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map
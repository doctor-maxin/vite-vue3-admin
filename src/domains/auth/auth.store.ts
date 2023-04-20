import { defineStore } from "pinia";
import { RemovableRef, useStorage } from "@vueuse/core";
import { IUser, LoginPayload } from "./auth.types";
import { clearToken, setToken } from "@/api/api-service";
import { signInRequest } from "./auth.api";

interface AuthState {
    isLogged: RemovableRef<boolean>;
    user?: RemovableRef<IUser | null>;
    token?: RemovableRef<string>;
  }

  
export const useAuthStore = defineStore("auth", {
    state: (): AuthState => {
      return {
        isLogged: useStorage("auth/is-logged", true),
        user: useStorage("auth/user", null, undefined, {
          serializer: {
            read: (v: any) => (v ? <IUser>JSON.parse(v) : null),
            write: (v: any) => JSON.stringify(v),
          },
        }),
        token: useStorage("auth/token", ""),
      };
    },
    actions: {
      setAuthorization(payload) {
        setToken(payload.token);
        this.isLogged = true;
        this.user = {
          email: payload.email,
          _id: payload._id,
        };
        this.token = payload.token;
      },
      async login(form: LoginPayload): Promise<boolean> {
        try {
          const result = await signInRequest(form);
          if (result.token) {
            this.setAuthorization(result);
            window.toastSuccess("Добро пожаловать!");
          }
          return true;
        } catch (error: any) {
          if (error instanceof Error) {
            console.log("Error");
            if (error.cause === 204) {
            }
          }
          window.toastError("Проверьте данные");
        }
        return false;
      },
      async logout() {
        clearToken();
        this.$patch((state) => {
          state.isLogged = false;
          state.user = undefined;
          state.token = undefined;
        });
        this.router.push("/login");
      },
      updateUser(user: IUser) {
        this.list = this.list.map(u => {
          if (u._id === user._id) return user
          return u
        })
      }
    },
  });
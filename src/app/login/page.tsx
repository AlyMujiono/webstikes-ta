"use client";
import React, { useState } from "react";
import { Image, Checkbox, Input, Button } from "@nextui-org/react";
import signIn from "@/components/firebase/signin";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/components/firebase/config";
import { toast } from "react-toastify";

const auth = getAuth(firebase_app);

// export const AuthContext = React.createContext({});

// export const useAuthContext = () => React.useContext(AuthContext);

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loaded, setloaded] = useState(false);
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  // const toggleVisibility = () => setIsVisible(!isVisible);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        return router.push("/dashboard/beranda");
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const submitsignIn = async () => {
    setloaded(true);
    const { result, error } = await signIn(email, password);
    console.log("error ", error);
    if (error) {
      setloaded(false);
      toast("ERROR, Please Try Again !");
      return console.log("error ", error);
    }

    setloaded(false);
    // else successful
    return router.push("/dashboard/beranda");
  };

  if (loading) {
    return <div className="bg-white">Loading</div>;
  } else {
    return (
      <div className="flex flex-col md:flex-row h-screen w-screen">
        <div className="flex md:w-3/4">
          <Image
            alt="Login"
            src="/login.png"
            radius="none"
            removeWrapper={true}
            width={"100%"}
          />
        </div>
        <div className="flex flex-col md:w-1/4 px-10">
          <div className="flex flex-col items-center ">
            <Image alt="Logo" src="/logopuskesmas.png" radius="none" />
            <div>Login untuk melanjutkan</div>
          </div>
          <div className="flex flex-col mt-6 w-full">
            <Input
              classNames={{ base:"light" }}
              type="email"
              name="email"
              label="Email"
              onValueChange={setEmail}
              value={email}
            />
            <Input
              classNames={{ base:"light" }}
              label="Password"
              name="password"
              // placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              className="mb-5 mt-2 bg-white rounded-xl"
              onValueChange={setPassword}
              value={password}
            />
            <Checkbox isSelected={isVisible} onValueChange={setIsVisible} 
              classNames={{ base:"light" }}
              >
              Show Password
            </Checkbox>
            <Button
              className="mt-5 bg-ungu text-white p-3"
              onPress={submitsignIn}
              isLoading={loaded}
              id="submit"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

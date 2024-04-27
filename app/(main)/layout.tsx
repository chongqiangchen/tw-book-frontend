import {Headers} from "@/components/headers";
import {Sidebar} from "@/components/sidebar";
import {ReactNode} from "react";

const MainLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className="hidden md:block">
            <Headers/>
            <div className="border-t">
                <div className="bg-background">
                    <div className="grid lg:grid-cols-6" style={{height: "calc(100vh - 40px)"}}>
                        <Sidebar className="hidden lg:block"/>
                        <div className="col-span-5 lg:col-span-5 lg:border-l">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout;
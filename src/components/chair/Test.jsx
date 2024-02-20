import * as React from "react";

export default function Test(props) {
    return (
        <div className="flex flex-col py-3 bg-white">
            

            <div className="flex gap-5 justify-between items-start px-px mt-2 w-full text-sm text-zinc-400 max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col flex-1 self-end px-5 pb-2.5 mt-12 max-md:mt-10 max-md:max-w-full">
                    <div className="self-center text-4xl font-normal text-black underline">
                        Enter Form to start Voting Event
                    </div>
                    <form>
                    <input type="text" className="shrink-0 mt-6 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:max-w-full" />
                    <div className="self-start mt-3">Enter your name</div>

                    </form>
                    
                    <div className="shrink-0 mt-12 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:mt-10 max-md:max-w-full" />
                    <div className="self-start mt-3">Enter DOB</div>
                    <div className="shrink-0 mt-12 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:mt-10 max-md:max-w-full" />
                    <div className="self-start mt-3">Enter your Wallet No</div>
                    <div className="shrink-0 mt-12 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:mt-10 max-md:max-w-full" />
                    <div className="self-start mt-3">Enter text</div>
                    <div className="shrink-0 mt-12 rounded-3xl border-white border-solid bg-zinc-100 border-[3px] h-[68px] max-md:mt-10 max-md:max-w-full" />
                    <div className="self-start mt-3">Enter text</div>
                </div>

            </div>
        </div>
    );
}



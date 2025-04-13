"use client"

import { useEffect } from "react"
import SummaryOrder from "../summaryOrder"
import { useOrderContext } from "@/context/OrderContext"
import { ShieldCheckIcon } from "lucide-react"
import DiscountCode from "../../discountCode"

export default function OfferBasic() {
    const { state, dispatch } = useOrderContext()

    useEffect(() => {
        dispatch({ type: "offers", payload: "basic" })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex items-start gap-5 w-full mt-5">
            <div className="w-full">
                <div className="flex justify-between items-start bg-boxColor border border-borderColor p-5 rounded-lg w-full">
                    <div className="flex items-center gap-3 ">
                        <div className="flex items-center justify-center w-14 h-14 bg-borderColor rounded-lg">
                            <ShieldCheckIcon className="w-7 h-7 text-primaryColor" />
                        </div>
                        <div className="">
                            <p className="font-semibold">Podstawowa ochrona</p>
                            <span className="text-sm text-textColor">
                                {state.price}zł / serwer
                            </span>
                        </div>
                    </div>
                    <div className="bg-primaryColor px-3 py-1 rounded-full text-sm">
                        Wybrany pakiet
                    </div>
                </div>
                <div className="bg-boxColor border border-borderColor  rounded-lg w-full mt-5">
                    <p className="font-semibold p-5">Dane serwera</p>
                    <div className="w-full h-[1px] bg-borderColor"></div>
                    <div className="p-5">
                        <div className="flex flex-col">
                            <label htmlFor="link" className="text-sm">
                                Link do szablonu
                            </label>
                            <input
                                type="text"
                                id="link"
                                className="bg-altBackgroundColor border border-borderColor w-full p-3 rounded-xl mt-2 focus:outline-none placeholder:text-placeHolderTextColor focus:ring-1 focus:ring-primaryColor
  "
                                placeholder="https://szablonydiscord.pl/templates/"
                            />
                        </div>
                    </div>
                </div>
                <DiscountCode />
            </div>
            <SummaryOrder />
        </div>
    )
}

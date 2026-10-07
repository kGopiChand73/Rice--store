import "./AddressItem.css";

const TYPE_ICON={

    home:(

        <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <path d="M10 2l8 6.4V18h-5v-6H7v6H2V8.4L10 2z" fill="currentColor"/>
        </svg>

    ),

    work:(

        <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <rect x="2" y="6" width="16" height="11" rx="1.5" fill="currentColor"/>
            <path d="M7 6V4.5A1.5 1.5 0 018.5 3h3A1.5 1.5 0 0113 4.5V6" fill="none" stroke="currentColor" strokeWidth="1.6"/>
        </svg>

    ),

    default:(

        <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <path d="M10 2a5.5 5.5 0 015.5 5.5c0 4-5.5 10.5-5.5 10.5S4.5 11.5 4.5 7.5A5.5 5.5 0 0110 2zm0 7.5a2 2 0 100-4 2 2 0 000 4z" fill="currentColor"/>
        </svg>

    ),

};

function iconFor(type){

    const key=(type||"").toLowerCase();

    return TYPE_ICON[key]||TYPE_ICON.default;

}

export default function AddressItem({

    address,

}){

    const line=[address.house_no,address.street]

        .filter(Boolean)

        .join(", ");

    return(

        <div className={

            address.is_default

                ?"address-item address-item--default"

                :"address-item"

        }>

            <div className="address-item-icon">

                {iconFor(address.address_type)}

            </div>

            <div className="address-item-body">

                <div className="address-item-top">

                    <span className="address-type">

                        {address.address_type||"Address"}

                    </span>

                    {

                        address.is_default&&(

                            <span className="default-address">

                                Default

                            </span>

                        )

                    }

                </div>

                <p className="address-name">

                    {address.full_name}

                </p>

                {

                    line&&(

                        <p className="address-line">

                            {line}

                        </p>

                    )

                }

                {

                    address.city&&(

                        <p className="address-city">

                            {address.city}

                        </p>

                    )

                }

            </div>

        </div>

    );

}
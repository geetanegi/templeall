import React from 'react'

interface BettingOverviewProps {

}

const sectionArr = [
    {
        style: "",
        content: [
            {
                name:"Total Wager Amount",
                value:"$1,685.50"
            },
            {
                name:"Total Winnings",
                value:"$34,560.00"
            },
            {
                name:"Net Earnings",
                value:"$32,874.50"
            },
        ]
    },
    {
        label: "Contest and Competition",
        style: "",
        content: [
            {
                name:"AceCam Jackpot",
                value: "$33,420.00",
            },
            {
                name:"Closest-to-Pin",
                value: "$615.00",
            },
            {
                name:"Hit-the-Green",
                value: "$380.00",
            },
            {
                name:"Other Chanalenges",
                value: "$20.00",
            }
        ]
    },
    {
        label: "AceCam Tournaments & Events",
        style: "justify-center",
        content: [
            {
                name:"AceCam Shootouts",
                value: "$0.00",
            },
            {
                name:"Best Finish",
                value: "T-11",
            },
            {
                name:"AceCam Outings",
                value: "$125.00",
            },
            {
                name:"Best Finish",
                value: "T-4",
            }
        ]
    },

]

const BettingOverview: React.FC<BettingOverviewProps> = () => {


    const computeSubBettingViewSection = (sections:Array<any>) => {
        return sections.map((item:any)=>(
            <div className={`mt-3`}>
                {
                    
                    item?.label && <h3 className="text-[14px] underline">{item?.label || ''}</h3>

                }
                {
                    item?.content?.map((itm:any)=>(
                        <div className='flex'>
                        <span className='text-[14px] text-gray-500 mr-1'>{itm.name}:</span>
                       
                        <span>{itm.value}</span>
                        </div>
                    ))
                }   
            </div>
        )) 
    }

    return (
        <div className='ml-0 lg:ml-10 mt-40 lg:mt-0 border lg:border-0 border-gray-400 p-2 lg:p-0 mb-10 lg:mb-0' style={{width: "fit-content"}}>
            <div className='flex jystify-between  whitespace-nowrap  gap-3 bg-[#F5F6F7B3] px-3 rounded-2xl '
              style={{ width: "fit-content" }}
            >
              <button >Performance</button>
              <button className='bg-[#95C11E] py-[2px] px-5 my-[2px] rounded-xl text-white'>Betting Overview</button>
            </div>
            {computeSubBettingViewSection(sectionArr)}
        </div>
    )
}

export default BettingOverview

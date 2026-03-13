import { type JSX } from 'react'
import { Tabs } from '@heroui/react'
import { useLocation, useNavigate } from 'react-router'

function Navbar(): JSX.Element {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <Tabs
            className="w-full max-w-md"
            selectedKey={location.pathname}
            onSelectionChange={(key) => navigate(String(key))}
        >
            <Tabs.ListContainer>
                <Tabs.List aria-label="Options">
                    <Tabs.Tab id="/overview">
                        Overview
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="/analytics">
                        Analytics
                        <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab id="/reports">
                        Reports
                        <Tabs.Indicator />
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs.ListContainer>
            {/* <Tabs.Panel className="pt-4" id="overview">
                <p>View your project overview and recent activity.</p>
            </Tabs.Panel>
            <Tabs.Panel className="pt-4" id="analytics">
                <p>Track your metrics and analyze performance data.</p>
            </Tabs.Panel>
            <Tabs.Panel className="pt-4" id="reports">
                <p>Generate and download detailed reports.</p>
            </Tabs.Panel> */}
        </Tabs>
    )
}

export default Navbar

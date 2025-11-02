import { FolderOpenIcon, HistoryIcon, KeyIcon } from "lucide-react";

export const menuItems = [
    {
        title: 'WorkFlows',
        items: [
            {
                title: 'WorkFlows',
                icon: FolderOpenIcon,
                url: '/workflows'
            },
            {
                title: 'Credentials',
                icon: KeyIcon,
                url: '/credentials'
            },
            {
                title: 'Executions',
                icon: HistoryIcon,
                url: '/executions'
            }
        ]
    }
]
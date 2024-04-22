import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FormControl } from "@/components/ui/form"
import {cn} from '@/utils'


const PopoverForm: React.FC<{ field: any }> = ({ field }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        role="popover-trigger"
                        className={cn("w-[200px] justify-between", )} 
                    >4E</Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <div className="grid gap-4 divide-y divide-slate-700">
                    <div className="space-y-2 bt-1-fff">
                        <Badge>Hola</Badge>
                    </div>
                    <div className="space-y-2 bt-1-fff">
                        <Badge>Hola</Badge>
                    </div>
                    <div className="space-y-2 bt-1-fff">
                        <Badge>Hola</Badge>
                    </div>
                    <div className="space-y-2 bt-1-fff">
                        <Badge>Hola</Badge>
                    </div>
                    <div className="space-y-2 bt-1-fff">
                        <Badge>Hola</Badge>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default PopoverForm
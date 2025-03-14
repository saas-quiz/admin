import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function RecentScores() {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Avatar className="h-6 w-6 xs:h-9 xs:w-9">
          <AvatarFallback className="text-xs xs:text-base">OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Martin</p>
          <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
        </div>
        <div className="ml-auto text-xs xs:text-base font-medium">99 %</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-6 w-6 xs:h-9 xs:w-9 items-center justify-center space-y-0 border">
          <AvatarFallback className="text-xs xs:text-base">JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
        </div>
        <div className="ml-auto text-xs xs:text-base font-medium">39 %</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-6 w-6 xs:h-9 xs:w-9">
          <AvatarFallback className="text-xs xs:text-base">IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
          <p className="text-sm text-muted-foreground">isabella.nguyen@email.com</p>
        </div>
        <div className="ml-auto text-xs xs:text-base font-medium">29 %</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-6 w-6 xs:h-9 xs:w-9">
          <AvatarFallback className="text-xs xs:text-base">WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">William Kim</p>
          <p className="text-sm text-muted-foreground">will@email.com</p>
        </div>
        <div className="ml-auto text-xs xs:text-base font-medium">99 %</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-6 w-6 xs:h-9 xs:w-9">
          <AvatarFallback className="text-xs xs:text-base">SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
        </div>
        <div className="ml-auto text-xs xs:text-base font-medium">39 %</div>
      </div>
    </div>
  );
}

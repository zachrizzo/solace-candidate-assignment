import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Phone, MapPin, Award, GraduationCap, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type FC } from "react"
import { type AdvocateCardProps, type Advocate } from "@/features/advocates/types/advocate.types"
import { formatPhoneNumber } from "@/shared/utils"

export const AdvocateCard: FC<AdvocateCardProps> = ({ advocate }) => {
  const initials = `${advocate.firstName.charAt(0)}${advocate.lastName.charAt(0)}`

  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-purple-100 dark:border-purple-900">
      <CardHeader className="pb-2 pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border shadow-sm">
            <AvatarFallback className="bg-purple-700 text-white text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-bold text-xl leading-none">
              {advocate.firstName} {advocate.lastName}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-3.5 w-3.5 text-purple-600" />
              {advocate.city}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pt-4">
        <div className="flex items-center gap-2 text-sm">
          <GraduationCap className="h-4 w-4 text-purple-600 flex-shrink-0" />
          <span className="font-medium">{advocate.degree}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Award className="h-4 w-4 text-purple-600 flex-shrink-0" />
          <span>
            <strong>{advocate.yearsOfExperience}</strong> years of experience
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-purple-600 flex-shrink-0" />
          <span>{formatPhoneNumber(advocate.phoneNumber)}</span>
        </div>

        <div className="space-y-3 ">
          <p className="text-sm font-semibold text-purple-700 dark:text-purple-400">Specialties</p>
          <div className="flex flex-wrap gap-2 h-20 bg-gray-100 dark:bg-gray-800/50 p-2 rounded-md overflow-y-auto pr-1">
            {advocate.specialties.map((specialty, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/40 dark:text-purple-300 dark:hover:bg-purple-900/60 min-w-[80px] h-6 px-2 flex items-center justify-center"
              >
                <span className="truncate">{specialty}</span>
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button className="w-full bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700">
            <Mail className="mr-2 h-4 w-4" />
            Contact Advocate
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


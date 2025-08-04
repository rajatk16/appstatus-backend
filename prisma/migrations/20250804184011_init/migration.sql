-- DropForeignKey
ALTER TABLE "public"."Monitor" DROP CONSTRAINT "Monitor_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MonitorLog" DROP CONSTRAINT "MonitorLog_monitorId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Monitor" ADD CONSTRAINT "Monitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MonitorLog" ADD CONSTRAINT "MonitorLog_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "public"."Monitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

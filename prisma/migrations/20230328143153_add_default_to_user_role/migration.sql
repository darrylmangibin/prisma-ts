-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user';

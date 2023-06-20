-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('admin', 'user') NULL DEFAULT 'user';

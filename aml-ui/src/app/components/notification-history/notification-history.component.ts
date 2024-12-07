import {Component, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Media} from '../../shared/media';
import {AmlApiService} from '../../services/aml-api.service';
import {Notification} from '../../shared/notification';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-notification-history',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    CommonModule
  ],
  templateUrl: './notification-history.component.html',
  styleUrl: './notification-history.component.scss'
})
export class NotificationHistoryComponent implements OnInit{
  @ViewChild(MatPaginator, {static:false}) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  displayedColumns: string[] = ['notificationType', 'notificationSendType','notificationSendType', 'notificationStatus', 'addedDate', 'sendAtDate'];
  dataSource = new MatTableDataSource<Notification>([]);

  userKey: number = 1;
  notifications: Notification[];

  constructor(private amlApiService: AmlApiService){}


  ngOnInit(): void {
    this.amlApiService.getNotifications(this.userKey).subscribe({
      next: (success) => {
        this.notifications = success;
        console.log(this.notifications);
      }
    });
  }

}

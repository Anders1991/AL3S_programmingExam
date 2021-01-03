insert into supervisor (id,name,email) values (1,'Hardy','Hard@kea.dk')
insert into supervisor (id,name,email) values (2,'Janus','Janu@kea.dk')

insert into student (id,name,email,fk_supervisor) values (1,'Torben','Torben@stud.kea.dk',1)
insert into student (id,name,email,fk_supervisor) values (2,'Knud','Knud@stud.kea.dk',2)
insert into student (id,name,email,fk_supervisor) values (3,'Bent','Bent@stud.kea.dk',1)